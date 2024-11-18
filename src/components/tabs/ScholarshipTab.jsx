import { useState } from 'react';
import { MagnifyingGlassIcon, AcademicCapIcon, CurrencyDollarIcon, CalendarIcon } from '@heroicons/react/24/outline';

export default function ScholarshipTab({ darkMode }) {
  const [searchQuery, setSearchQuery] = useState('');
  
  const scholarships = [
    {
      title: 'Academic Excellence Scholarship',
      amount: '$10,000',
      deadline: '2024-06-15',
      institution: 'Stanford University',
      requirements: 'GPA 3.8+, Research Experience',
      field: 'Computer Science',
      status: 'Open'
    },
    {
      title: 'Global Research Grant',
      amount: '$15,000',
      deadline: '2024-07-01',
      institution: 'MIT',
      requirements: 'Research Proposal, Publications',
      field: 'Artificial Intelligence',
      status: 'Open'
    },
    {
      title: 'Innovation Fellowship',
      amount: '$12,000',
      deadline: '2024-08-15',
      institution: 'Carnegie Mellon University',
      requirements: 'Portfolio, Project Experience',
      field: 'Robotics',
      status: 'Open'
    }
  ];

  const filteredScholarships = scholarships.filter(scholarship =>
    scholarship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scholarship.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scholarship.field.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="relative">
          <input
            type="text"
            placeholder="Search scholarships..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
          />
          <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredScholarships.map((scholarship, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg border ${
              darkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
            } hover:shadow-lg transition-shadow`}
          >
            <div className="flex items-center justify-between mb-4">
              <AcademicCapIcon className={`h-8 w-8 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                scholarship.status === 'Open'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {scholarship.status}
              </span>
            </div>
            
            <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {scholarship.title}
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <CurrencyDollarIcon className="h-5 w-5 text-gray-400 mr-2" />
                <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  {scholarship.amount}
                </span>
              </div>
              
              <div className="flex items-center">
                <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  Deadline: {scholarship.deadline}
                </span>
              </div>
              
              <div className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                <p className="font-medium">Institution:</p>
                <p>{scholarship.institution}</p>
              </div>
              
              <div className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                <p className="font-medium">Requirements:</p>
                <p>{scholarship.requirements}</p>
              </div>
              
              <div className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                <p className="font-medium">Field:</p>
                <p>{scholarship.field}</p>
              </div>
            </div>

            <button
              className={`mt-4 w-full px-4 py-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                darkMode ? 'ring-offset-gray-800' : ''
              }`}
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>

      {filteredScholarships.length === 0 && (
        <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <AcademicCapIcon className="mx-auto h-12 w-12" />
          <h3 className={`mt-2 text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            No scholarships found
          </h3>
          <p className="mt-1">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
}
