import React, { useState, useEffect } from 'react';
import { 
  CloudArrowUpIcon, 
  ArrowRightIcon,
  AcademicCapIcon,
  GlobeAltIcon,
  DocumentTextIcon,
  SparklesIcon,
  BeakerIcon,
  RocketLaunchIcon,
  LightBulbIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import '../../styles/login.css';

const LoginPage = ({ onLogin, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resume, setResume] = useState(null);
  const [sop, setSop] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [aiProcessing, setAiProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ resume: 0, sop: 0 });
  const [aiStatus, setAiStatus] = useState('');
  const [aiConfidence, setAiConfidence] = useState(0);

  useEffect(() => {
    document.title = "PhD Research Abroad - AI Assistant";
    return () => {
      document.title = "PhD Research Assistant";
    };
  }, []);

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setError('Please upload PDF files only');
        return;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setError('File size should be less than 10MB');
        return;
      }

      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress > 100) {
          progress = 100;
          clearInterval(interval);
        }
        setUploadProgress(prev => ({
          ...prev,
          [type]: Math.min(progress, 100)
        }));
      }, 200);

      if (type === 'resume') {
        setResume(file);
        simulateAIAnalysis('Analyzing academic background...');
      } else {
        setSop(file);
        simulateAIAnalysis('Processing research interests...');
      }
      setError('');
    }
  };

  const simulateAIAnalysis = (status) => {
    setAiStatus(status);
    setAiProcessing(true);
    let confidence = 0;
    const interval = setInterval(() => {
      confidence += Math.random() * 20;
      if (confidence > 100) {
        confidence = 100;
        clearInterval(interval);
        setAiProcessing(false);
      }
      setAiConfidence(Math.min(confidence, 100));
    }, 500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setAiProcessing(true);

    try {
      // Simulate AI processing
      setAiStatus('Analyzing academic profile...');
      await new Promise(resolve => setTimeout(resolve, 1500));
      setAiConfidence(30);
      
      setAiStatus('Evaluating research potential...');
      await new Promise(resolve => setTimeout(resolve, 1500));
      setAiConfidence(60);
      
      setAiStatus('Matching with universities...');
      await new Promise(resolve => setTimeout(resolve, 1500));
      setAiConfidence(90);
      
      setAiStatus('Finalizing analysis...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAiConfidence(100);

      // Create a mock profile for demonstration
      const mockProfile = {
        name: email.split('@')[0],
        email: email,
        researchInterests: ['Artificial Intelligence', 'Machine Learning', 'Computer Vision'],
        university: 'Sample University',
        department: 'Computer Science',
        publications: 3,
        citations: 45
      };

      // Call onLoginSuccess with the mock profile
      onLoginSuccess(mockProfile);
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
      setAiProcessing(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      
      if (resume) {
        formData.append('academicCV', resume);
      }
      if (sop) {
        formData.append('researchStatement', sop);
      }

      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      const data = await response.json();

      if (response.ok) {
        // Create a mock profile for demonstration
        const mockProfile = {
          name: email.split('@')[0],
          email: email,
          researchInterests: ['Artificial Intelligence', 'Machine Learning', 'Computer Vision'],
          university: 'Sample University',
          department: 'Computer Science',
          publications: 3,
          citations: 45
        };
        
        onLoginSuccess(mockProfile);
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: <AcademicCapIcon />,
      title: "AI Profile Analysis",
      description: "Advanced analysis of your academic background"
    },
    {
      icon: <GlobeAltIcon />,
      title: "Global Matching",
      description: "Find perfect research programs worldwide"
    },
    {
      icon: <LightBulbIcon />,
      title: "Research Alignment",
      description: "Match your interests with opportunities"
    },
    {
      icon: <ChartBarIcon />,
      title: "Success Prediction",
      description: "AI-powered admission chances"
    }
  ];

  return (
    <div className="login-container">
      <div className="neural-bg" />
      <div className="ai-decoration top-right" />
      <div className="ai-decoration bottom-left" />
      
      <div className="left">
        <div className="research-illustration">
          <BeakerIcon className="w-24 h-24 mx-auto mb-8 text-white" />
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-item">
              {feature.icon}
              <div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="right">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Academic Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.name@university.edu"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <div className="form-group">
            <label>Academic CV (PDF)</label>
            <div 
              className="upload-area"
              onClick={() => document.getElementById('resume').click()}
            >
              <CloudArrowUpIcon className="w-6 h-6 mx-auto mb-2" />
              <p>{resume ? resume.name : 'Click to upload CV'}</p>
              <input
                id="resume"
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileChange(e, 'resume')}
                style={{ display: 'none' }}
              />
              {uploadProgress.resume > 0 && (
                <div className="upload-progress">
                  <div 
                    className="upload-progress-bar"
                    style={{ width: `${uploadProgress.resume}%` }}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Research Statement (PDF)</label>
            <div 
              className="upload-area"
              onClick={() => document.getElementById('sop').click()}
            >
              <DocumentTextIcon className="w-6 h-6 mx-auto mb-2" />
              <p>{sop ? sop.name : 'Click to upload Research Statement'}</p>
              <input
                id="sop"
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileChange(e, 'sop')}
                style={{ display: 'none' }}
              />
              {uploadProgress.sop > 0 && (
                <div className="upload-progress">
                  <div 
                    className="upload-progress-bar"
                    style={{ width: `${uploadProgress.sop}%` }}
                  />
                </div>
              )}
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? (
              <>
                <SparklesIcon className="w-5 h-5" />
                Processing...
              </>
            ) : (
              <>
                <RocketLaunchIcon className="w-5 h-5" />
                Start Research Journey
              </>
            )}
          </button>

          {aiProcessing && (
            <div className="ai-processing">
              <div className="pulse" />
              <div>
                <p>{aiStatus}</p>
                <div className="upload-progress">
                  <div 
                    className="upload-progress-bar"
                    style={{ width: `${aiConfidence}%` }}
                  />
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
