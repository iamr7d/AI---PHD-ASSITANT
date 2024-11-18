const express = require('express');
const multer = require('multer');
const pdf = require('pdf-parse');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// Enable CORS with specific options
app.use(cors({
  origin: 'http://localhost:5173', // Vite's default port
  credentials: true
}));

// Parse URL-encoded bodies and JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
}).fields([
  { name: 'resume', maxCount: 1 },
  { name: 'sop', maxCount: 1 }
]);

// Helper function to extract text from PDF
async function extractTextFromPDF(buffer) {
  try {
    const data = await pdf(buffer);
    return data.text;
  } catch (error) {
    console.error('Error extracting PDF text:', error);
    throw new Error('Failed to extract text from PDF');
  }
}

// Mock AI analysis function (since we don't have actual AI integration yet)
async function mockAnalyzeProfile(resumeText, sopText) {
  return {
    personalInfo: {
      education: ['Mock University'],
      skills: ['Research', 'Data Analysis']
    },
    research: {
      interests: ['AI', 'Machine Learning'],
      experience: ['Research Assistant']
    },
    background: {
      summary: 'Experienced researcher with focus on AI',
      achievements: ['Published papers', 'Awards']
    }
  };
}

// Login endpoint with improved error handling
app.post('/login', (req, res) => {
  upload(req, res, async function(err) {
    try {
      // Handle multer errors
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ error: 'File size too large. Maximum size is 10MB.' });
        }
        return res.status(400).json({ error: err.message });
      } else if (err) {
        return res.status(400).json({ error: 'Error uploading files.' });
      }

      // Get form data
      const { email, password } = req.body;
      
      // Validate email and password
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
      }

      // Check if files were uploaded
      if (!req.files || !req.files.resume || !req.files.sop) {
        return res.status(400).json({ error: 'Both Academic CV and Research Statement are required.' });
      }

      // Process the uploaded documents
      const resumeText = await extractTextFromPDF(req.files.resume[0].buffer);
      const sopText = await extractTextFromPDF(req.files.sop[0].buffer);

      // Analyze documents (using mock function for now)
      const profile = await mockAnalyzeProfile(resumeText, sopText);

      // Create JWT token
      const token = jwt.sign(
        { email, profile },
        process.env.JWT_SECRET || 'your_jwt_secret_key',
        { expiresIn: '24h' }
      );

      // Send success response
      res.json({
        token,
        profile,
        message: 'Login successful'
      });

    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ 
        error: 'Login failed. Please try again.',
        details: error.message 
      });
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    details: err.message
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`CORS enabled for origin: http://localhost:5173`);
});
