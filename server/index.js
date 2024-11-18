const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Function to format email addresses correctly
function formatEmailAddress(text) {
  return text
    .replace(/\b(at|AT|At)\b/g, '@')
    .replace(/\b(dot|DOT|Dot)\b/g, '.')
    .replace(/\[|\]/g, '')
    .replace(/\{|\}/g, '')
    .replace(/\(|\)/g, '')
    .replace(/\s+@\s+/g, '@')
    .replace(/\s+\.\s+/g, '.')
    .replace(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, (match) => {
      return match.toLowerCase();
    });
}

// Function to extract LinkedIn URL from text
function extractLinkedInUrl(text) {
  const linkedinRegex = /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/(?:in|pub)\/[a-zA-Z0-9-]+(?:\/[a-zA-Z0-9-]+)*\/?/g;
  const matches = text.match(linkedinRegex);
  return matches ? matches[0] : null;
}

// Function to extract email addresses from text
function extractEmails(text) {
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
  const matches = text.match(emailRegex) || [];
  return matches.map(email => formatEmailAddress(email));
}

// Function to get all links from a webpage
async function getAllLinks(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const links = new Set();
    const baseUrl = new URL(url).origin;

    $('a').each((_, element) => {
      let href = $(element).attr('href');
      if (href) {
        if (href.startsWith('/')) {
          href = baseUrl + href;
        } else if (!href.startsWith('http')) {
          href = new URL(href, url).href;
        }
        if (href.startsWith(baseUrl)) {
          links.add(href);
        }
      }
    });

    return Array.from(links);
  } catch (error) {
    console.error('Error getting links:', error);
    return [];
  }
}

// Function to extract text content from a webpage
async function extractPageContent(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    
    // Remove script and style elements
    $('script, style').remove();
    
    // Get text content
    return $('body').text().replace(/\s+/g, ' ').trim();
  } catch (error) {
    console.error('Error extracting content:', error);
    return '';
  }
}

app.post('/api/generate-professor-content', async (req, res) => {
  try {
    const { websiteUrl } = req.body;
    console.log('Received website URL:', websiteUrl);

    // Get main page content
    const mainContent = await extractPageContent(websiteUrl);
    
    // Extract contact information
    const emails = extractEmails(mainContent);
    const linkedinUrl = extractLinkedInUrl(mainContent);

    // Get all links from the main page
    const links = await getAllLinks(websiteUrl);
    
    // Extract content from linked pages (limited to 3 for performance)
    let additionalContent = '';
    for (const link of links.slice(0, 3)) {
      const content = await extractPageContent(link);
      additionalContent += ' ' + content;
    }

    // Combine all content
    const fullContent = mainContent + ' ' + additionalContent;

    // Extract key information
    const researchKeywords = fullContent.match(/research|interests|projects|publications|areas|machine learning|artificial intelligence|deep learning|neural networks|computer vision|natural language processing|robotics|security|systems|networks|databases|algorithms|theory|software engineering|distributed systems/gi) || [];
    const uniqueKeywords = [...new Set(researchKeywords.map(kw => kw.toLowerCase()))];
    
    // Generate match data with research interests
    const researchInterests = uniqueKeywords.map(keyword => ({
      area: keyword.charAt(0).toUpperCase() + keyword.slice(1),
      matchPercentage: Math.floor(Math.random() * 40) + 60, // Random match percentage between 60-100
      description: `Research focus on ${keyword}`
    }));

    // Generate response
    const response = {
      professorInfo: fullContent.slice(0, 500) + '...',
      emailDraft: `Dear Professor,\n\nI am writing to express my interest in pursuing a PhD under your supervision. I came across your research work${researchKeywords.length > 0 ? ' in ' + researchKeywords.slice(0, 3).join(', ') : ''} and found it fascinating.\n\nI would appreciate the opportunity to discuss potential research opportunities in your lab.\n\nBest regards,\n[Your name]`,
      matchingPoints: [
        'Research interests alignment',
        'Academic background',
        'Technical skills'
      ],
      contactInfo: {
        email: emails[0] || null,
        additionalEmails: emails.slice(1)
      },
      linkedinUrl: linkedinUrl,
      researchInterests: researchInterests,
      overallMatch: {
        score: Math.floor(Math.random() * 20) + 80,
        details: [
          { category: 'Research Alignment', score: Math.floor(Math.random() * 20) + 80 },
          { category: 'Technical Skills', score: Math.floor(Math.random() * 20) + 80 },
          { category: 'Academic Background', score: Math.floor(Math.random() * 20) + 80 }
        ]
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
