import React from 'react';
import { Bar, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

// Topic tag colors for different research areas
const topicColors = [
  { bg: 'bg-blue-100 dark:bg-blue-900', text: 'text-blue-800 dark:text-blue-100', border: 'border-blue-200 dark:border-blue-800' },
  { bg: 'bg-green-100 dark:bg-green-900', text: 'text-green-800 dark:text-green-100', border: 'border-green-200 dark:border-green-800' },
  { bg: 'bg-purple-100 dark:bg-purple-900', text: 'text-purple-800 dark:text-purple-100', border: 'border-purple-200 dark:border-purple-800' },
  { bg: 'bg-pink-100 dark:bg-pink-900', text: 'text-pink-800 dark:text-pink-100', border: 'border-pink-200 dark:border-pink-800' },
  { bg: 'bg-yellow-100 dark:bg-yellow-900', text: 'text-yellow-800 dark:text-yellow-100', border: 'border-yellow-200 dark:border-yellow-800' },
  { bg: 'bg-indigo-100 dark:bg-indigo-900', text: 'text-indigo-800 dark:text-indigo-100', border: 'border-indigo-200 dark:border-indigo-800' },
];

const TopicTag = ({ topic, colorIndex }) => {
  const color = topicColors[colorIndex % topicColors.length];
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${color.bg} ${color.text} ${color.border} border m-1`}>
      {topic}
    </span>
  );
};

export default function ProfileMatch({ matchData, darkMode, professorData }) {
  if (!matchData) return null;

  const textColor = darkMode ? 'rgb(229, 231, 235)' : 'rgb(17, 24, 39)';
  const gridColor = darkMode ? 'rgba(229, 231, 235, 0.1)' : 'rgba(17, 24, 39, 0.1)';

  // Calculate average match score
  const averageScore = matchData.overallMatch ? Math.round(
    matchData.overallMatch.details.reduce((a, b) => a + b.score, 0) / matchData.overallMatch.details.length
  ) : 0;

  // Prepare radar chart data
  const radarData = {
    labels: matchData.overallMatch ? matchData.overallMatch.details.map(detail => detail.category) : [],
    datasets: [
      {
        label: 'Profile Match',
        data: matchData.overallMatch ? matchData.overallMatch.details.map(detail => detail.score) : [],
        backgroundColor: darkMode 
          ? 'rgba(59, 130, 246, 0.2)' 
          : 'rgba(37, 99, 235, 0.2)',
        borderColor: darkMode 
          ? 'rgb(59, 130, 246)' 
          : 'rgb(37, 99, 235)',
        borderWidth: 2,
      },
    ],
  };

  const radarOptions = {
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
          color: textColor,
        },
        grid: {
          color: gridColor,
        },
        pointLabels: {
          color: textColor,
          font: {
            size: 11
          }
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Overall Profile Compatibility',
        color: textColor,
        font: {
          size: 14,
          weight: 'bold'
        }
      },
    },
  };

  // Research Interests Bar Chart
  const researchData = {
    labels: matchData.researchInterests?.map(item => item.area),
    datasets: [
      {
        label: 'Match Percentage',
        data: matchData.researchInterests?.map(item => item.matchPercentage),
        backgroundColor: darkMode 
          ? 'rgba(59, 130, 246, 0.7)' 
          : 'rgba(37, 99, 235, 0.7)',
        borderColor: darkMode 
          ? 'rgb(59, 130, 246)' 
          : 'rgb(37, 99, 235)',
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: gridColor,
        },
        ticks: {
          color: textColor,
        },
      },
      x: {
        grid: {
          color: gridColor,
        },
        ticks: {
          color: textColor,
          maxRotation: 45,
          minRotation: 45
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Research Interest Alignment',
        color: textColor,
        font: {
          size: 14,
          weight: 'bold'
        }
      },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content - Left 2/3 */}
      <div className="lg:col-span-2 space-y-6">
        <div className="flex flex-col md:flex-row gap-6 items-stretch">
          {/* Match Score Card */}
          <div className={`flex-1 p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="text-center">
              <div className={`text-5xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'} mb-2`}>
                {averageScore}%
              </div>
              <div className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Overall Match Score
              </div>
              <div className="mt-4">
                {matchData.overallMatch?.details.map((detail, index) => (
                  <div key={index} className="flex justify-between items-center mt-2">
                    <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{detail.category}</span>
                    <span className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} font-medium`}>{detail.score}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Research Topics */}
          <div className={`flex-1 p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              Research Topics
            </h3>
            <div className="flex flex-wrap">
              {matchData.researchInterests?.map((item, index) => (
                <TopicTag key={index} topic={item.area} colorIndex={index} />
              ))}
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6`}>
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div style={{ height: '300px' }}>
              <Bar data={researchData} options={barOptions} />
            </div>
          </div>

          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div style={{ height: '300px' }}>
              <Radar data={radarData} options={radarOptions} />
            </div>
          </div>
        </div>

        {/* Detailed Match Analysis */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            Detailed Match Analysis
          </h3>
          <div className="space-y-4">
            {matchData.overallMatch?.details.map((detail, index) => (
              <div key={index} className="flex items-center">
                <div className="flex-1">
                  <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {detail.category}
                  </span>
                </div>
                <div className="w-1/2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${detail.score}%` }}
                  />
                </div>
                <span className={`ml-3 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {detail.score}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Professor Profile - Right 1/3 */}
      <div className="lg:col-span-1">
        <div className={`sticky top-6 p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg space-y-6`}>
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Professor Profile
          </h2>
          
          <div className="space-y-4">
            <div>
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                {professorData?.name}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {professorData?.title}
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {professorData?.institution}
              </p>
            </div>

            <div>
              <h4 className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Key Publications
              </h4>
              <ul className={`text-sm space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {professorData?.keyPublications?.map((pub, index) => (
                  <li key={index} className="line-clamp-2">• {pub}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Potential Research Topics
              </h4>
              <ul className={`text-sm space-y-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {professorData?.potentialTopics?.map((topic, index) => (
                  <li key={index}>• {topic}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className={`text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Contact Information
              </h4>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {professorData?.contactInfo}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
