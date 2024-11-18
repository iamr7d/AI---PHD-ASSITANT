import React from 'react';
import { SunIcon, MoonIcon, UserCircleIcon } from '@heroicons/react/24/outline';

function Header({ darkMode, setDarkMode, sidebarOpen, setSidebarOpen, userProfile }) {
  return (
    <header className={`fixed top-0 left-0 right-0 h-16 z-20 border-b
      ${darkMode 
        ? 'bg-gray-800 border-gray-700 text-white' 
        : 'bg-white border-gray-200 text-gray-900'
      }
    `}>
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700
              ${darkMode ? 'text-gray-200' : 'text-gray-600'}
            `}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl font-bold">Gafoor Ka Dosth</h1>
        </div>

        <div className="flex items-center space-x-4">
          {userProfile && (
            <div className="flex items-center space-x-3">
              {userProfile.picture ? (
                <img 
                  src={userProfile.picture} 
                  alt={userProfile.name}
                  className="h-8 w-8 rounded-full"
                />
              ) : (
                <UserCircleIcon className="h-8 w-8" />
              )}
              <span className="text-sm font-medium hidden sm:block">
                {userProfile.name || userProfile.email}
              </span>
            </div>
          )}
          
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700
              ${darkMode ? 'text-gray-200' : 'text-gray-600'}
            `}
          >
            {darkMode ? (
              <SunIcon className="h-6 w-6" />
            ) : (
              <MoonIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
