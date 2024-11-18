import React, { useState } from 'react';
import { BookOpenIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

function StudyTab({ darkMode }) {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('General');

  const subjects = ['General', 'Mathematics', 'Physics', 'Computer Science', 'Chemistry', 'Biology'];

  const handleAddNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, {
        id: Date.now(),
        content: newNote,
        subject: selectedSubject,
        timestamp: new Date().toLocaleString()
      }]);
      setNewNote('');
    }
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="space-y-6">
      <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Study Notes
      </h2>

      {/* Add Note Section */}
      <div className="space-y-4">
        <div className="flex space-x-4">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className={`rounded-lg border px-4 py-2 w-48
              ${darkMode 
                ? 'bg-gray-700 text-white border-gray-600' 
                : 'bg-white text-gray-900 border-gray-300'
              }
            `}
          >
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>

          <div className="flex-1">
            <input
              type="text"
              placeholder="Add a new note..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border
                ${darkMode 
                  ? 'bg-gray-700 text-white border-gray-600' 
                  : 'bg-white text-gray-900 border-gray-300'
                }
              `}
            />
          </div>

          <button
            onClick={handleAddNote}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <PlusIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Notes List */}
      <div className="space-y-4">
        {notes.map(note => (
          <div
            key={note.id}
            className={`p-4 rounded-lg border
              ${darkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
              }
            `}
          >
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <BookOpenIcon className="h-5 w-5 text-indigo-500" />
                  <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {note.subject}
                  </span>
                </div>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  {note.content}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {note.timestamp}
                </p>
              </div>
              <button
                onClick={() => handleDeleteNote(note.id)}
                className="p-2 text-red-500 hover:text-red-600 rounded-lg 
                  hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}

        {notes.length === 0 && (
          <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            No notes yet. Start by adding a new note above.
          </div>
        )}
      </div>
    </div>
  );
}

export default StudyTab;
