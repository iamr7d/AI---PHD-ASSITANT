import React, { useState, useEffect } from 'react';
import {
  AcademicCapIcon,
  GlobeAltIcon,
  DocumentTextIcon,
  ChartBarIcon,
  ChatBubbleBottomCenterTextIcon,
  BriefcaseIcon,
  UserCircleIcon,
  CogIcon,
} from '@heroicons/react/24/outline';
import './Dashboard.css';

const Dashboard = ({ userProfile }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [researchMatches, setResearchMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading research matches
    setTimeout(() => {
      setResearchMatches([
        {
          university: 'MIT',
          program: 'Computer Science PhD',
          professor: 'Dr. Sarah Johnson',
          match: 95,
          deadline: '2024-12-15',
          interests: ['AI', 'Machine Learning', 'Robotics']
        },
        {
          university: 'Stanford University',
          program: 'Artificial Intelligence PhD',
          professor: 'Dr. Michael Chen',
          match: 92,
          deadline: '2024-11-30',
          interests: ['Deep Learning', 'Computer Vision', 'NLP']
        },
        {
          university: 'ETH Zurich',
          program: 'Robotics and AI PhD',
          professor: 'Dr. Anna Mueller',
          match: 88,
          deadline: '2024-12-01',
          interests: ['Robotics', 'AI Systems', 'Control Theory']
        }
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  const navigationItems = [
    { name: 'Overview', icon: ChartBarIcon, id: 'overview' },
    { name: 'Research Matches', icon: GlobeAltIcon, id: 'matches' },
    { name: 'Applications', icon: DocumentTextIcon, id: 'applications' },
    { name: 'Messages', icon: ChatBubbleBottomCenterTextIcon, id: 'messages' },
    { name: 'Opportunities', icon: BriefcaseIcon, id: 'opportunities' },
    { name: 'Profile', icon: UserCircleIcon, id: 'profile' },
    { name: 'Settings', icon: CogIcon, id: 'settings' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="overview-section">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Research Match Score</h3>
                <div className="score">95%</div>
                <p>Based on your profile analysis</p>
              </div>
              <div className="stat-card">
                <h3>Potential Universities</h3>
                <div className="score">25+</div>
                <p>Matching your research interests</p>
              </div>
              <div className="stat-card">
                <h3>Active Applications</h3>
                <div className="score">3</div>
                <p>Currently in progress</p>
              </div>
              <div className="stat-card">
                <h3>Research Areas</h3>
                <div className="score">5</div>
                <p>Identified from your profile</p>
              </div>
            </div>

            <div className="matches-preview">
              <h2>Top Research Matches</h2>
              <div className="matches-grid">
                {loading ? (
                  <div className="loading">Loading matches...</div>
                ) : (
                  researchMatches.map((match, index) => (
                    <div key={index} className="match-card">
                      <div className="match-header">
                        <h3>{match.university}</h3>
                        <span className="match-score">{match.match}% Match</span>
                      </div>
                      <p className="program">{match.program}</p>
                      <p className="professor">{match.professor}</p>
                      <div className="interests">
                        {match.interests.map((interest, i) => (
                          <span key={i} className="interest-tag">{interest}</span>
                        ))}
                      </div>
                      <div className="deadline">
                        Application Deadline: {new Date(match.deadline).toLocaleDateString()}
                      </div>
                      <button className="apply-button">View Details</button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        );
      case 'matches':
        return <div>Research Matches Content</div>;
      case 'applications':
        return <div>Applications Content</div>;
      case 'messages':
        return <div>Messages Content</div>;
      case 'opportunities':
        return <div>Opportunities Content</div>;
      case 'profile':
        return <div>Profile Content</div>;
      case 'settings':
        return <div>Settings Content</div>;
      default:
        return <div>Overview Content</div>;
    }
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="nav-header">
          <AcademicCapIcon className="nav-logo" />
          <h1>PhD Research Assistant</h1>
        </div>
        <div className="nav-items">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="nav-icon" />
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </nav>
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Welcome to Your Research Dashboard</h1>
          <p>Find and match with global research opportunities</p>
        </header>
        <div className="dashboard-content">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
