import React from 'react';

function TabsNavigation({ activeTab, setActiveTab, sidebarOpen, darkMode, tabs }) {
  return (
    <div
      className={`fixed top-16 left-0 h-full w-64 transition-all duration-200 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}
        border-r border-gray-200 dark:border-gray-700
      `}
    >
      <nav className="mt-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full px-4 py-3 flex items-center space-x-3 transition-colors duration-200
                ${activeTab === tab.id
                  ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }
              `}
            >
              {Icon && (
                <Icon className="h-5 w-5" />
              )}
              <span>{tab.name}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default TabsNavigation;
