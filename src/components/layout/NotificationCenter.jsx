import React from 'react';
import { clsx } from 'clsx';

export default function NotificationCenter({
  show,
  notifications,
  onClose,
  onRemove,
  darkMode
}) {
  if (!show) return null;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'deadline':
        return '⏰';
      case 'email':
        return '📧';
      case 'scholarship':
        return '🎓';
      case 'timer':
        return '⌛';
      case 'writing':
        return '✍️';
      default:
        return '📌';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return darkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-50 text-red-600';
      case 'medium':
        return darkMode ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-50 text-yellow-600';
      case 'low':
        return darkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-50 text-green-600';
      default:
        return darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-600';
    }
  };

  const formatTime = (time) => {
    if (!time) return '';
    const date = new Date(time);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      
      <div className={clsx(
        'absolute right-0 top-0 h-full w-full max-w-sm overflow-y-auto',
        darkMode ? 'bg-gray-900' : 'bg-white',
        'shadow-xl'
      )}>
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className={clsx(
            'text-lg font-semibold',
            darkMode ? 'text-white' : 'text-gray-900'
          )}>
            Notifications
          </h2>
          <button
            onClick={onClose}
            className={clsx(
              'p-2 rounded-lg transition-colors',
              darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
            )}
          >
            ✕
          </button>
        </div>

        <div className="p-4 space-y-4">
          {notifications.length === 0 ? (
            <p className={clsx(
              'text-center py-8',
              darkMode ? 'text-gray-400' : 'text-gray-500'
            )}>
              No notifications
            </p>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={clsx(
                  'p-4 rounded-lg relative group',
                  darkMode ? 'bg-gray-800' : 'bg-gray-50'
                )}
              >
                <div className="flex items-start space-x-3">
                  <div className={clsx(
                    'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center',
                    getPriorityColor(notification.priority)
                  )}>
                    <span className="text-xl">
                      {getNotificationIcon(notification.type)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={clsx(
                      'text-sm font-medium',
                      darkMode ? 'text-white' : 'text-gray-900'
                    )}>
                      {notification.title}
                    </p>
                    <p className={clsx(
                      'text-sm',
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    )}>
                      {notification.message}
                    </p>
                    <p className={clsx(
                      'text-xs mt-1',
                      darkMode ? 'text-gray-500' : 'text-gray-400'
                    )}>
                      {formatTime(notification.time)}
                    </p>
                  </div>
                  <button
                    onClick={() => onRemove(notification.id)}
                    className={clsx(
                      'opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded',
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                    )}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
