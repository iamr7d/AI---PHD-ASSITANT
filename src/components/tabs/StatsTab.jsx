import React from 'react';
import { ChartBarIcon, ClockIcon, DocumentIcon, StarIcon } from '@heroicons/react/24/outline';

function StatsTab({ darkMode }) {
  const stats = [
    {
      id: 1,
      name: 'Study Hours',
      value: '24',
      unit: 'hours',
      icon: ClockIcon,
      change: '+12%',
      changeType: 'increase'
    },
    {
      id: 2,
      name: 'Notes Created',
      value: '15',
      unit: 'notes',
      icon: DocumentIcon,
      change: '+5',
      changeType: 'increase'
    },
    {
      id: 3,
      name: 'Focus Score',
      value: '85',
      unit: '%',
      icon: StarIcon,
      change: '+3%',
      changeType: 'increase'
    },
    {
      id: 4,
      name: 'Productivity',
      value: '92',
      unit: '%',
      icon: ChartBarIcon,
      change: '+7%',
      changeType: 'increase'
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Study Statistics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className={`p-6 rounded-lg border
                ${darkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
                }
              `}
            >
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <Icon className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {stat.name}
                </h3>
                <div className="flex items-baseline mt-1">
                  <p className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {stat.value}
                  </p>
                  <p className={`ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {stat.unit}
                  </p>
                </div>
                <div className="flex items-center mt-2">
                  <span className={`text-sm ${
                    stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {stat.change}
                  </span>
                  <span className={`ml-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    vs last week
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Placeholder for future charts */}
      <div className={`p-6 rounded-lg border text-center
        ${darkMode 
          ? 'bg-gray-800 border-gray-700 text-gray-400' 
          : 'bg-white border-gray-200 text-gray-500'
        }
      `}>
        Detailed analytics and charts coming soon!
      </div>
    </div>
  );
}

export default StatsTab;
