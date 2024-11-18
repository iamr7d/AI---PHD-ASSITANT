import React, { useState, useEffect } from 'react';
import { PlayIcon, PauseIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

function TimerTab({ darkMode }) {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [timerType, setTimerType] = useState('pomodoro'); // pomodoro, shortBreak, longBreak

  const timerTypes = {
    pomodoro: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60
  };

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(timerTypes[timerType]);
  };

  const changeTimerType = (type) => {
    setTimerType(type);
    setIsRunning(false);
    setTimeLeft(timerTypes[type]);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Study Timer
      </h2>

      <div className="flex justify-center space-x-4">
        <button
          onClick={() => changeTimerType('pomodoro')}
          className={`px-4 py-2 rounded-lg transition-colors
            ${timerType === 'pomodoro'
              ? 'bg-indigo-600 text-white'
              : darkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
          `}
        >
          Pomodoro
        </button>
        <button
          onClick={() => changeTimerType('shortBreak')}
          className={`px-4 py-2 rounded-lg transition-colors
            ${timerType === 'shortBreak'
              ? 'bg-indigo-600 text-white'
              : darkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
          `}
        >
          Short Break
        </button>
        <button
          onClick={() => changeTimerType('longBreak')}
          className={`px-4 py-2 rounded-lg transition-colors
            ${timerType === 'longBreak'
              ? 'bg-indigo-600 text-white'
              : darkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
          `}
        >
          Long Break
        </button>
      </div>

      <div className={`p-8 rounded-lg border text-center
        ${darkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
        }
      `}>
        <div className={`text-6xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {formatTime(timeLeft)}
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={toggleTimer}
            className="p-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {isRunning ? (
              <PauseIcon className="h-6 w-6" />
            ) : (
              <PlayIcon className="h-6 w-6" />
            )}
          </button>
          <button
            onClick={resetTimer}
            className={`p-3 rounded-full
              ${darkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
              focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`}
          >
            <ArrowPathIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className={`p-6 rounded-lg border
        ${darkMode 
          ? 'bg-gray-800 border-gray-700 text-gray-400' 
          : 'bg-white border-gray-200 text-gray-500'
        }
      `}>
        <h3 className="font-medium mb-2">Timer Instructions:</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Pomodoro: 25 minutes of focused work</li>
          <li>Short Break: 5 minutes to recharge</li>
          <li>Long Break: 15 minutes after completing 4 pomodoros</li>
        </ul>
      </div>
    </div>
  );
}

export default TimerTab;
