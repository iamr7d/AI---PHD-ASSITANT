import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AcademicCapIcon, LightBulbIcon, PencilIcon, ChartBarIcon, ClockIcon, BookOpenIcon, BellIcon } from '@heroicons/react/24/outline';
import MainContent from './components/layout/MainContent';
import Header from './components/layout/Header';
import TabsNavigation from './components/layout/TabsNavigation';
import WriteTab from './components/tabs/WriteTab';
import PhDMailTab from './components/tabs/PhDMailTab';
import StudyTab from './components/tabs/StudyTab';
import StatsTab from './components/tabs/StatsTab';
import TimerTab from './components/tabs/TimerTab';
import ScholarshipTab from './components/tabs/ScholarshipTab';
import AlertsTab from './components/tabs/AlertsTab';
import PhDOpportunitiesTab from './components/tabs/PhDOpportunitiesTab';
import LoginPage from './components/auth/LoginPage';
import ErrorBoundary from './components/ErrorBoundary';
import Dashboard from './components/dashboard/Dashboard';
import './styles/custom.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('write');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [pomodoroTime, setPomodoroTime] = useState(1500);
  const [notifications, setNotifications] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const handleLoginSuccess = (profile) => {
    console.log('Login successful, profile:', profile);
    setIsAuthenticated(true);
    setUserProfile(profile);
  };

  const addNotification = (notification) => {
    setNotifications([...notifications, notification]);
  };

  const tabs = [
    { id: 'write', name: 'Write', icon: PencilIcon },
    { id: 'phd-mail', name: 'PhD Email', icon: AcademicCapIcon },
    { id: 'phd-opportunities', name: 'PhD Opportunities', icon: LightBulbIcon },
    { id: 'study', name: 'Study', icon: BookOpenIcon },
    { id: 'stats', name: 'Stats', icon: ChartBarIcon },
    { id: 'timer', name: 'Timer', icon: ClockIcon },
    { id: 'scholarship', name: 'Scholarship', icon: AcademicCapIcon },
    { id: 'alerts', name: 'Alerts', icon: BellIcon }
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'write':
        return <WriteTab darkMode={darkMode} />;
      case 'phd-mail':
        return <PhDMailTab darkMode={darkMode} userProfile={userProfile} />;
      case 'phd-opportunities':
        return <PhDOpportunitiesTab darkMode={darkMode} />;
      case 'study':
        return <StudyTab darkMode={darkMode} />;
      case 'stats':
        return <StatsTab darkMode={darkMode} />;
      case 'timer':
        return <TimerTab 
          darkMode={darkMode}
          pomodoroTime={pomodoroTime}
          setPomodoroTime={setPomodoroTime}
        />;
      case 'scholarship':
        return <ScholarshipTab darkMode={darkMode} />;
      case 'alerts':
        return <AlertsTab 
          darkMode={darkMode}
          notifications={notifications}
          addNotification={addNotification}
        />;
      default:
        return <WriteTab darkMode={darkMode} />;
    }
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route 
            path="/" 
            element={
              isAuthenticated ? 
              <Navigate to="/dashboard" replace /> : 
              <LoginPage onLoginSuccess={handleLoginSuccess} />
            } 
          />
          <Route 
            path="/dashboard/*" 
            element={
              isAuthenticated ? 
              <ErrorBoundary>
                <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
                  <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
                    <Header 
                      darkMode={darkMode}
                      setDarkMode={setDarkMode}
                      sidebarOpen={sidebarOpen}
                      setSidebarOpen={setSidebarOpen}
                      userProfile={userProfile}
                    />
                    
                    <TabsNavigation 
                      activeTab={activeTab}
                      setActiveTab={setActiveTab}
                      sidebarOpen={sidebarOpen}
                      darkMode={darkMode}
                      tabs={tabs}
                    />
                    
                    <MainContent 
                      sidebarOpen={sidebarOpen}
                      darkMode={darkMode}
                    >
                      {renderActiveTab()}
                    </MainContent>
                  </div>
                </div>
              </ErrorBoundary> : 
              <Navigate to="/" replace />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
