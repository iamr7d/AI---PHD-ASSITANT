import React from 'react';

export default function ProfessorCard({ professorData, darkMode }) {
  if (!professorData) return null;

  return (
    <div className={`rounded-lg shadow-lg p-6 mb-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <h2 className="text-2xl font-bold mb-2">{professorData.name}</h2>
      <p className="text-lg mb-2">{professorData.title}</p>
      <p className="text-lg mb-4">{professorData.institution}</p>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Research Areas</h3>
        <ul className="list-disc list-inside">
          {professorData.researchAreas.map((area, index) => (
            <li key={index} className="mb-1">{area}</li>
          ))}
        </ul>
      </div>

      {professorData.keyPublications && professorData.keyPublications.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Key Publications</h3>
          <ul className="list-disc list-inside">
            {professorData.keyPublications.map((pub, index) => (
              <li key={index} className="mb-1">{pub}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Potential Collaboration Topics</h3>
        <ul className="list-disc list-inside">
          {professorData.potentialTopics.map((topic, index) => (
            <li key={index} className="mb-1">{topic}</li>
          ))}
        </ul>
      </div>

      {professorData.contactInfo && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
          <p>{professorData.contactInfo}</p>
        </div>
      )}
    </div>
  );
}
