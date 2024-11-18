import React, { useState, useMemo } from 'react';
import { MagnifyingGlassIcon, GlobeAltIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

const websites = [
  // Global Portals
  {
    name: 'FindAPhD',
    url: 'https://www.findaphd.com',
    category: 'General',
    region: 'Global',
    description: 'Comprehensive database of PhD opportunities worldwide'
  },
  {
    name: 'PhDs.org',
    url: 'https://www.phds.org',
    category: 'General',
    region: 'Global',
    description: 'PhD program listings and academic career resources'
  },
  {
    name: 'Academic Positions',
    url: 'https://academicpositions.com',
    category: 'Academic',
    region: 'Global',
    description: 'Academic job board and PhD positions'
  },
  // USA
  {
    name: 'GradSchools.com',
    url: 'https://www.gradschools.com',
    category: 'General',
    region: 'USA',
    description: 'Comprehensive graduate school and PhD program directory'
  },
  {
    name: 'HigherEdJobs',
    url: 'https://www.higheredjobs.com',
    category: 'Academic',
    region: 'USA',
    description: 'Academic positions and PhD opportunities in USA'
  },
  // Europe
  {
    name: 'EURAXESS',
    url: 'https://euraxess.ec.europa.eu',
    category: 'Research',
    region: 'Europe',
    description: 'European research opportunities and funding'
  },
  {
    name: 'EuroScienceJobs',
    url: 'https://www.eurosciencejobs.com',
    category: 'Research',
    region: 'Europe',
    description: 'Science and research positions in Europe'
  },
  // UK
  {
    name: 'jobs.ac.uk',
    url: 'https://www.jobs.ac.uk',
    category: 'Academic',
    region: 'UK',
    description: 'UK academic jobs and PhD positions'
  },
  {
    name: 'UK Research and Innovation',
    url: 'https://www.ukri.org',
    category: 'Research',
    region: 'UK',
    description: 'Research funding and PhD opportunities in UK'
  },
  // Australia
  {
    name: 'Seek PhD',
    url: 'https://www.seek.com.au/phd-jobs',
    category: 'General',
    region: 'Australia',
    description: 'PhD positions in Australia'
  },
  // Research Specific
  {
    name: 'ResearchGate',
    url: 'https://www.researchgate.net/jobs',
    category: 'Research',
    region: 'Global',
    description: 'Research positions and collaborations worldwide'
  },
  {
    name: 'Nature Careers',
    url: 'https://www.nature.com/naturecareers',
    category: 'Research',
    region: 'Global',
    description: 'Scientific research positions and PhD opportunities'
  },
  {
    name: 'Science Careers',
    url: 'https://jobs.sciencecareers.org',
    category: 'Research',
    region: 'Global',
    description: 'Science and research positions worldwide'
  },
  // Funding Specific
  {
    name: 'ProFellow',
    url: 'https://www.profellow.com',
    category: 'Funding',
    region: 'Global',
    description: 'Fellowships and funding opportunities database'
  },
  {
    name: 'Scholarship Portal',
    url: 'https://www.scholarshipportal.com',
    category: 'Funding',
    region: 'Global',
    description: 'Scholarships and grants for PhD studies'
  }
];

const regions = ['All', 'Global', 'USA', 'Europe', 'UK', 'Australia'];
const categories = ['All', 'General', 'Academic', 'Research', 'Funding'];

export default function PhDOpportunitiesTab({ darkMode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredWebsites = useMemo(() => {
    return websites.filter(website => {
      const matchesSearch = website.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          website.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = selectedRegion === 'All' || website.region === selectedRegion;
      const matchesCategory = selectedCategory === 'All' || website.category === selectedCategory;
      return matchesSearch && matchesRegion && matchesCategory;
    });
  }, [searchQuery, selectedRegion, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search PhD opportunities..."
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

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className={`px-4 py-2 rounded-lg border ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`px-4 py-2 rounded-lg border ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Website Grid */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredWebsites.map((website, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg border ${
              darkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
            } hover:shadow-lg transition-shadow`}
          >
            <div className="flex items-center justify-between mb-4">
              <GlobeAltIcon className={`h-8 w-8 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                darkMode
                  ? 'bg-gray-700 text-gray-300'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {website.region}
              </span>
            </div>

            <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {website.name}
            </h3>

            <p className={`mb-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {website.description}
            </p>

            <div className="flex items-center justify-between">
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {website.category}
              </span>
              <a
                href={website.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-4 py-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                  darkMode ? 'ring-offset-gray-800' : ''
                }`}
              >
                Visit Site
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredWebsites.length === 0 && (
        <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <AcademicCapIcon className="mx-auto h-12 w-12" />
          <h3 className={`mt-2 text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            No websites found
          </h3>
          <p className="mt-1">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
}
