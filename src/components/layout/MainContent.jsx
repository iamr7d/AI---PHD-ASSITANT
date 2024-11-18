import React from 'react';
import clsx from 'clsx';

export default function MainContent({ children, sidebarOpen, darkMode }) {
  return (
    <main className={clsx(
      'flex-1 min-h-screen transition-all duration-200',
      sidebarOpen ? 'ml-64' : 'ml-0',
      darkMode ? 'bg-gray-900' : 'bg-gray-100'
    )}>
      <div className="max-w-7xl mx-auto p-6 pt-24">
        {children}
      </div>
    </main>
  );
}
