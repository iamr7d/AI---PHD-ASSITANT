import { useState } from 'react';
import { BellIcon, AcademicCapIcon, ClockIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

export default function AlertsTab({ darkMode }) {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'deadline',
      title: 'Research Paper Deadline Approaching',
      description: 'Your AI Ethics paper is due in 48 hours',
      timestamp: '2 hours ago',
      priority: 'high',
      icon: DocumentTextIcon
    },
    {
      id: 2,
      type: 'scholarship',
      title: 'New Scholarship Opportunity',
      description: 'MIT AI Research Fellowship applications are now open',
      timestamp: '4 hours ago',
      priority: 'medium',
      icon: AcademicCapIcon
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Study Session Scheduled',
      description: 'Machine Learning study group at 3 PM',
      timestamp: '1 day ago',
      priority: 'low',
      icon: ClockIcon
    }
  ]);

  const [notificationEnabled, setNotificationEnabled] = useState(true);

  const getPriorityColor = (priority) => {
    const colors = {
      high: darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800',
      medium: darkMode ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800',
      low: darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'
    };
    return colors[priority] || colors.low;
  };

  const removeAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Recent Notifications
          </h2>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
            {alerts.length} New
          </span>
        </div>

        <div className="space-y-4">
          {alerts.map((alert) => {
            const Icon = alert.icon;
            return (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border ${
                  darkMode
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-white border-gray-200'
                } hover:shadow-lg transition-shadow`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <Icon className={`h-6 w-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {alert.title}
                      </p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(alert.priority)}`}>
                        {alert.priority}
                      </span>
                    </div>
                    <p className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {alert.description}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        {alert.timestamp}
                      </p>
                      <button
                        onClick={() => removeAlert(alert.id)}
                        className={`text-xs ${
                          darkMode
                            ? 'text-gray-400 hover:text-gray-300'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {alerts.length === 0 && (
            <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <BellIcon className="mx-auto h-12 w-12" />
              <h3 className={`mt-2 text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                No new notifications
              </h3>
              <p className="mt-1">You're all caught up!</p>
            </div>
          )}
        </div>
      </div>

      <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <h3 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Notification Settings
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BellIcon className={`h-6 w-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <span className={darkMode ? 'text-white' : 'text-gray-900'}>Email Notifications</span>
            </div>
            <button
              onClick={() => setNotificationEnabled(!notificationEnabled)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                notificationEnabled ? 'bg-indigo-600' : darkMode ? 'bg-gray-700' : 'bg-gray-200'
              } ${darkMode ? 'focus:ring-offset-gray-800' : ''}`}
            >
              <span className="sr-only">Toggle notifications</span>
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  notificationEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
