import React, { useState, useEffect } from 'react';
import clsx from 'clsx'; // Removed curly brackets
import ProfessorCard from '../ProfessorCard';
import ProfileMatch from '../ProfileMatch';
import { 
  DocumentDuplicateIcon, 
  CheckIcon, 
  BeakerIcon, 
  UserCircleIcon, 
  EnvelopeIcon,
  AcademicCapIcon,
  ChartBarIcon,
  LightBulbIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

// AI Assistant Animation Component
const AIAssistantBubble = ({ darkMode, onClick }) => (
  <div className={clsx(
    "fixed bottom-8 right-8 p-4 rounded-full shadow-lg cursor-pointer transition-transform hover:scale-110",
    darkMode ? "bg-blue-600" : "bg-blue-500"
  )} onClick={onClick}>
    <SparklesIcon className="w-6 h-6 text-white animate-pulse" />
  </div>
);

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description, darkMode }) => (
  <div className={clsx(
    "p-6 rounded-xl transition-all hover:scale-105",
    darkMode ? "bg-gray-800 hover:bg-gray-750" : "bg-white hover:bg-gray-50"
  )}>
    <div className="flex items-center space-x-4 mb-4">
      <div className={clsx(
        "p-3 rounded-lg",
        darkMode ? "bg-blue-900/20" : "bg-blue-50"
      )}>
        <Icon className={clsx(
          "w-6 h-6",
          darkMode ? "text-blue-400" : "text-blue-600"
        )} />
      </div>
      <h3 className={clsx(
        "text-lg font-semibold",
        darkMode ? "text-white" : "text-gray-900"
      )}>
        {title}
      </h3>
    </div>
    <p className={clsx(
      "text-sm",
      darkMode ? "text-gray-400" : "text-gray-600"
    )}>
      {description}
    </p>
  </div>
);

const LoadingStep = ({ step, currentStep, darkMode }) => (
  <div className={clsx(
    "flex items-center space-x-2",
    currentStep === step ? "text-blue-500" : 
    darkMode ? "text-gray-400" : "text-gray-600"
  )}>
    <div className={clsx(
      "w-2 h-2 rounded-full",
      currentStep === step ? "bg-blue-500" : "bg-gray-400"
    )} />
    <span className="text-sm">
      {step === 0 && "AI is analyzing the website..."}
      {step === 1 && "Extracting research information..."}
      {step === 2 && "Crafting personalized email..."}
      {step === 3 && "Computing profile match..."}
    </span>
  </div>
);

const TabIcon = ({ icon: Icon, label, active, darkMode }) => (
  <div className="flex items-center space-x-2">
    <Icon className={clsx(
      "w-5 h-5",
      active 
        ? "text-blue-600 dark:text-blue-500" 
        : "text-gray-500 dark:text-gray-400"
    )} />
    <span>{label}</span>
  </div>
);

// Contact Info Component
const ContactInfo = ({ email, linkedinUrl, darkMode }) => (
  <div className={clsx(
    "p-4 rounded-lg mb-4",
    darkMode ? "bg-gray-800" : "bg-gray-50"
  )}>
    <h3 className={clsx(
      "text-lg font-semibold mb-3",
      darkMode ? "text-white" : "text-gray-900"
    )}>
      Contact Information
    </h3>
    <div className="space-y-2">
      {email && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <EnvelopeIcon className="w-5 h-5 text-gray-400" />
            <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
              {email}
            </span>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(email);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className={clsx(
              "px-3 py-1 rounded-lg text-sm transition-colors",
              darkMode 
                ? "bg-gray-700 hover:bg-gray-600 text-gray-300" 
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            )}
          >
            {copied ? "Copied!" : "Copy Email"}
          </button>
        </div>
      )}
      {linkedinUrl && (
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
          <a 
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              "text-blue-500 hover:underline",
              darkMode ? "hover:text-blue-400" : "hover:text-blue-600"
            )}
          >
            View LinkedIn Profile
          </a>
        </div>
      )}
    </div>
  </div>
);

export default function PhDMailTab({ darkMode }) {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [professorData, setProfessorData] = useState(null);
  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('email');
  const [showAITips, setShowAITips] = useState(false);
  const [emailData, setEmailData] = useState({
    draft: '',
    contactInfo: null,
    linkedinUrl: null
  });

  // AI Writing Tips
  const writingTips = [
    "Personalize your email by mentioning specific research papers",
    "Highlight relevant technical skills and experience",
    "Keep paragraphs concise and focused",
    "Express genuine interest in the professor's work",
    "End with a clear call to action"
  ];

  const features = [
    {
      icon: AcademicCapIcon,
      title: "Smart Profile Matching",
      description: "AI-powered analysis of research interests and academic background compatibility."
    },
    {
      icon: LightBulbIcon,
      title: "Intelligent Email Generation",
      description: "Context-aware email drafting that highlights your strengths and relevant experience."
    },
    {
      icon: ChartBarIcon,
      title: "Research Alignment",
      description: "Visual representation of how your interests align with the professor's work."
    }
  ];

  // Student information
  const studentInfo = {
    name: "John Doe",
    background: "Computer Science and Machine Learning",
    interests: "Deep Learning, Computer Vision, and Natural Language Processing",
    experience: "2 years of research experience in computer vision",
    achievements: "Published 2 papers in international conferences",
    education: "MSc in Computer Science",
    technicalSkills: ["Python", "TensorFlow", "PyTorch", "Computer Vision", "NLP"],
    publications: ["Deep Learning for Object Detection", "Attention Mechanisms in Vision"],
    projects: ["Real-time Object Detection System", "Language Model for Code Generation"]
  };

  // Copy email to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const generateEmail = async () => {
    if (!websiteUrl) {
      setError('Please enter a professor\'s website URL');
      return;
    }

    setLoading(true);
    setError('');
    setCurrentStep(0);
    setProfessorData(null);
    setMatchData(null);

    try {
      const response = await fetch('/api/generate-professor-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ websiteUrl }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate content');
      }

      const data = await response.json();
      console.log('Received data:', data);
      
      // Update state with received data
      setGeneratedEmail(data.emailDraft);
      setProfessorData(data.professorInfo);
      setMatchData({
        researchInterests: data.researchInterests || [],
        overallMatch: data.overallMatch || {
          score: 0,
          details: []
        }
      });
      setEmailData({
        draft: data.emailDraft,
        contactInfo: data.contactInfo,
        linkedinUrl: data.linkedinUrl
      });
      setActiveTab('email');
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to generate email. Please try again.');
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'email', label: 'Email Draft', icon: EnvelopeIcon },
    { id: 'match', label: 'AI Match Analysis', icon: BeakerIcon },
    { id: 'generator', label: 'Email Generator', icon: SparklesIcon },
    { id: 'profile', label: 'Profile Card', icon: UserCircleIcon },
    { id: 'student', label: 'Student Profile', icon: AcademicCapIcon },
  ];

  const [quickEmailData, setQuickEmailData] = useState({
    professorEmail: '',
    researchInterests: '',
    emailContent: ''
  });

  const handleQuickEmailGenerate = () => {
    const { professorEmail, researchInterests } = quickEmailData;
    const email = `Dear Professor,

I hope this email finds you well. I am writing to express my interest in pursuing a PhD under your supervision at your institution. I am particularly interested in your research work on ${researchInterests}.

My background in ${studentInfo.background} aligns well with your research interests, and I have relevant experience in ${studentInfo.experience}. I have published papers on ${studentInfo.publications.join(', ')}, and worked on projects including ${studentInfo.projects.join(', ')}.

I would greatly appreciate the opportunity to discuss potential PhD opportunities in your research group.

Thank you for your time and consideration.

Best regards,
${studentInfo.name}
${studentInfo.education}`;

    setQuickEmailData(prev => ({ ...prev, emailContent: email }));
  };

  // Profile card data
  const profileCardData = {
    name: studentInfo.name,
    title: studentInfo.education,
    background: studentInfo.background,
    interests: studentInfo.interests.split(', '),
    skills: studentInfo.technicalSkills,
    publications: studentInfo.publications,
    projects: studentInfo.projects,
    achievements: studentInfo.achievements
  };

  return (
    <div className={clsx(
      "min-h-screen p-6",
      darkMode ? "bg-gray-900" : "bg-gray-50"
    )}>
      <div className="max-w-[100rem] mx-auto space-y-6">
        {/* Hero Section with Animated Background */}
        <div className={clsx(
          "relative text-center p-12 rounded-xl shadow-lg overflow-hidden",
          darkMode ? "bg-gray-800" : "bg-white"
        )}>
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500" />
            <div className="absolute inset-0 bg-grid-pattern animate-grid" />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <div className="inline-flex items-center space-x-2 mb-6">
              <SparklesIcon className={clsx(
                "w-8 h-8 animate-pulse",
                darkMode ? "text-blue-400" : "text-blue-600"
              )} />
              <span className={clsx(
                "text-sm font-medium px-3 py-1 rounded-full",
                darkMode ? "bg-blue-900/20 text-blue-400" : "bg-blue-50 text-blue-600"
              )}>
                Powered by AI
              </span>
            </div>

            <h1 className={clsx(
              "text-4xl font-bold mb-4",
              darkMode ? "text-white" : "text-gray-900"
            )}>
              AI-Powered PhD Email Assistant
            </h1>
            <p className={clsx(
              "text-xl mb-8 max-w-2xl mx-auto",
              darkMode ? "text-gray-300" : "text-gray-600"
            )}>
              Craft the perfect email to your potential PhD advisor with the help of advanced AI
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  darkMode={darkMode}
                />
              ))}
            </div>

            {/* URL Input Section */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <div className={clsx(
                  "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none",
                  darkMode ? "text-gray-400" : "text-gray-500"
                )}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="Enter professor's website URL..."
                  className={clsx(
                    "w-full pl-12 pr-32 py-4 border rounded-xl focus:ring-2 focus:outline-none text-lg transition-shadow",
                    darkMode 
                      ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 placeholder-gray-400" 
                      : "bg-white border-gray-300 text-gray-900 focus:ring-blue-600 placeholder-gray-500"
                  )}
                />
                <button
                  onClick={generateEmail}
                  disabled={loading}
                  className={clsx(
                    "absolute right-2 top-2 px-6 py-2 rounded-lg font-medium transition-all",
                    "transform active:scale-95 flex items-center space-x-2",
                    loading 
                      ? "bg-gray-400 cursor-not-allowed" 
                      : darkMode
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-blue-500 hover:bg-blue-600 text-white"
                  )}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <SparklesIcon className="w-5 h-5" />
                      <span>Generate with AI</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className={clsx(
            "p-4 rounded-xl border-l-4 border-red-500",
            darkMode ? "bg-red-900/20 text-red-200" : "bg-red-50 text-red-700"
          )}>
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <p>{error}</p>
            </div>
          </div>
        )}

        {loading && (
          <div className={clsx(
            "p-6 rounded-xl shadow-lg space-y-4",
            darkMode ? "bg-gray-800" : "bg-white"
          )}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-500 border-t-transparent" />
              <span className={darkMode ? "text-gray-200" : "text-gray-700"}>
                AI is working on your request...
              </span>
            </div>
            {[0, 1, 2, 3].map((step) => (
              <LoadingStep 
                key={step} 
                step={step} 
                currentStep={currentStep}
                darkMode={darkMode}
              />
            ))}
          </div>
        )}

        {(generatedEmail || matchData) && (
          <div className={clsx(
            "rounded-xl shadow-lg overflow-hidden",
            darkMode ? "bg-gray-800" : "bg-white"
          )}>
            {/* Tabs Navigation */}
            <div className="border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center px-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={clsx(
                      "flex items-center px-6 py-4 border-b-2 transition-colors",
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600 dark:text-blue-500"
                        : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    )}
                  >
                    <TabIcon 
                      icon={tab.icon}
                      label={tab.label}
                      active={activeTab === tab.id}
                      darkMode={darkMode}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'email' && generatedEmail && (
                <div>
                  {emailData.contactInfo && (
                    <ContactInfo 
                      email={emailData.contactInfo.email}
                      linkedinUrl={emailData.linkedinUrl}
                      darkMode={darkMode}
                    />
                  )}
                  <div className="flex items-center justify-between mb-4">
                    <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Your Personalized Email
                    </h2>
                    <button
                      onClick={copyToClipboard}
                      className={clsx(
                        "inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all",
                        "focus:outline-none focus:ring-2 focus:ring-offset-2",
                        copied
                          ? darkMode
                            ? "bg-green-600 hover:bg-green-700 text-white"
                            : "bg-green-500 hover:bg-green-600 text-white"
                          : darkMode
                            ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                            : "bg-indigo-500 hover:bg-indigo-600 text-white",
                        darkMode ? "ring-offset-gray-800" : ""
                      )}
                    >
                      {copied ? (
                        <>
                          <CheckIcon className="w-5 h-5 mr-2" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <DocumentDuplicateIcon className="w-5 h-5 mr-2" />
                          <span>Copy Email</span>
                        </>
                      )}
                    </button>
                  </div>
                  
                  <div className={clsx(
                    "p-6 rounded-lg font-mono text-sm whitespace-pre-wrap",
                    darkMode 
                      ? "bg-gray-900 text-gray-200" 
                      : "bg-gray-50 text-gray-800"
                  )}>
                    {generatedEmail}
                  </div>
                </div>
              )}

              {activeTab === 'match' && matchData && (
                <ProfileMatch 
                  matchData={matchData} 
                  darkMode={darkMode} 
                  professorData={professorData}
                />
              )}

              {activeTab === 'generator' && (
                <div className="space-y-6">
                  <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Quick Email Generator
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                        Professor's Email
                      </label>
                      <input
                        type="email"
                        value={quickEmailData.professorEmail}
                        onChange={(e) => setQuickEmailData(prev => ({ ...prev, professorEmail: e.target.value }))}
                        placeholder="professor@university.edu"
                        className={clsx(
                          "w-full px-4 py-2 rounded-lg border",
                          darkMode
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500",
                          "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        )}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                        Research Interests
                      </label>
                      <textarea
                        value={quickEmailData.researchInterests}
                        onChange={(e) => setQuickEmailData(prev => ({ ...prev, researchInterests: e.target.value }))}
                        placeholder="Machine Learning, Computer Vision, etc."
                        rows={3}
                        className={clsx(
                          "w-full px-4 py-2 rounded-lg border",
                          darkMode
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500",
                          "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        )}
                      />
                    </div>

                    <button
                      onClick={handleQuickEmailGenerate}
                      className={clsx(
                        "w-full px-4 py-2 rounded-lg font-medium transition-all",
                        "flex items-center justify-center space-x-2",
                        darkMode
                          ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                          : "bg-indigo-500 hover:bg-indigo-600 text-white"
                      )}
                    >
                      <SparklesIcon className="w-5 h-5" />
                      <span>Generate Quick Email</span>
                    </button>

                    {quickEmailData.emailContent && (
                      <div className="mt-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            Generated Email
                          </h3>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(quickEmailData.emailContent);
                              setCopied(true);
                              setTimeout(() => setCopied(false), 2000);
                            }}
                            className={clsx(
                              "inline-flex items-center px-3 py-1.5 rounded-lg text-sm transition-all",
                              copied
                                ? "bg-green-500 text-white"
                                : darkMode
                                  ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            )}
                          >
                            {copied ? (
                              <>
                                <CheckIcon className="w-4 h-4 mr-1.5" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <DocumentDuplicateIcon className="w-4 h-4 mr-1.5" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                        <div className={clsx(
                          "p-4 rounded-lg font-mono text-sm whitespace-pre-wrap",
                          darkMode
                            ? "bg-gray-800 text-gray-200"
                            : "bg-gray-50 text-gray-800"
                        )}>
                          {quickEmailData.emailContent}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'profile' && (
                <div className={clsx(
                  "p-6 rounded-xl",
                  darkMode ? "bg-gray-800" : "bg-white"
                )}>
                  <div className="text-center mb-6">
                    <div className={clsx(
                      "inline-flex items-center justify-center w-20 h-20 rounded-full mb-4",
                      darkMode ? "bg-gray-700" : "bg-gray-100"
                    )}>
                      <UserCircleIcon className={clsx(
                        "w-12 h-12",
                        darkMode ? "text-gray-400" : "text-gray-600"
                      )} />
                    </div>
                    <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {profileCardData.name}
                    </h2>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {profileCardData.title}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Background
                        </h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {profileCardData.background}
                        </p>
                      </div>

                      <div>
                        <h3 className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Research Interests
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {profileCardData.interests.map((interest, index) => (
                            <span
                              key={index}
                              className={clsx(
                                "px-3 py-1 rounded-full text-xs font-medium",
                                darkMode
                                  ? "bg-indigo-900/20 text-indigo-300"
                                  : "bg-indigo-50 text-indigo-700"
                              )}
                            >
                              {interest}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Technical Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {profileCardData.skills.map((skill, index) => (
                            <span
                              key={index}
                              className={clsx(
                                "px-3 py-1 rounded-full text-xs font-medium",
                                darkMode
                                  ? "bg-blue-900/20 text-blue-300"
                                  : "bg-blue-50 text-blue-700"
                              )}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Publications
                        </h3>
                        <ul className={`text-sm space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {profileCardData.publications.map((pub, index) => (
                            <li key={index} className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>{pub}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Projects
                        </h3>
                        <ul className={`text-sm space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {profileCardData.projects.map((project, index) => (
                            <li key={index} className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>{project}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Achievements
                        </h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {profileCardData.achievements}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'student' && (
                <div className="space-y-6">
                  <div className={clsx(
                    "p-6 rounded-lg",
                    darkMode ? "bg-gray-900" : "bg-gray-50"
                  )}>
                    <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Student Profile
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className={`text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Background
                          </h3>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {studentInfo.background}
                          </p>
                        </div>
                        <div>
                          <h3 className={`text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Research Interests
                          </h3>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {studentInfo.interests}
                          </p>
                        </div>
                        <div>
                          <h3 className={`text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Experience
                          </h3>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {studentInfo.experience}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h3 className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Technical Skills
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {studentInfo.technicalSkills.map((skill, index) => (
                              <span
                                key={index}
                                className={clsx(
                                  "px-3 py-1 rounded-full text-xs font-medium",
                                  darkMode
                                    ? "bg-blue-900/20 text-blue-300 border border-blue-800"
                                    : "bg-blue-50 text-blue-700 border border-blue-100"
                                )}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Publications
                          </h3>
                          <ul className={`text-sm space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {studentInfo.publications.map((pub, index) => (
                              <li key={index} className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>{pub}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Projects
                          </h3>
                          <ul className={`text-sm space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {studentInfo.projects.map((project, index) => (
                              <li key={index} className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>{project}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* AI Assistant Bubble */}
      <AIAssistantBubble 
        darkMode={darkMode} 
        onClick={() => setShowAITips(!showAITips)} 
      />

      {/* AI Writing Tips Panel */}
      {showAITips && (
        <div className={clsx(
          "fixed bottom-24 right-8 w-80 p-4 rounded-xl shadow-lg",
          darkMode ? "bg-gray-800" : "bg-white"
        )}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={clsx(
              "text-lg font-semibold",
              darkMode ? "text-white" : "text-gray-900"
            )}>
              AI Writing Tips
            </h3>
            <button
              onClick={() => setShowAITips(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <ul className="space-y-2">
            {writingTips.map((tip, index) => (
              <li key={index} className="flex items-start space-x-2">
                <LightBulbIcon className={clsx(
                  "w-5 h-5 mt-0.5",
                  darkMode ? "text-blue-400" : "text-blue-600"
                )} />
                <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
                  {tip}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
