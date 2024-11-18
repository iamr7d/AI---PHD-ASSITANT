import { useState } from 'react';
import { MagnifyingGlassIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

export default function MailTab() {
  const [professorUrl, setProfessorUrl] = useState('');
  const [emailContent, setEmailContent] = useState('');

  return (
    <div className="space-y-6">
      {/* Professor URL Analysis */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <span className="text-xl mr-2">🔍</span>
          Professor Research Analysis
        </h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Enter professor's research page URL..."
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            value={professorUrl}
            onChange={(e) => setProfessorUrl(e.target.value)}
          />
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Email Composition */}
      <div className="grid grid-cols-2 gap-6">
        {/* Email Editor */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">
              📧 Email Composition
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Subject..."
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <textarea
                placeholder="Write your email..."
                className="w-full h-[300px] px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
              />
              <button className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2">
                <PaperAirplaneIcon className="h-5 w-5" />
                <span>Send Email</span>
              </button>
            </div>
          </div>
        </div>

        {/* AI Assistant */}
        <div className="space-y-4">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <span className="text-xl mr-2">💡</span>
              AI Writing Assistant
            </h3>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-700 mb-2">Research Alignment</h4>
                <p className="text-sm text-gray-600">
                  Professor's research focuses on machine learning and AI...
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-700 mb-2">Suggestions</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Mention specific papers or projects</li>
                  <li>• Highlight relevant experience</li>
                  <li>• Be concise and professional</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-700 mb-2">Email Templates</h4>
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-colors">
                    PhD Application Inquiry
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-colors">
                    Research Position Request
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-colors">
                    Follow-up Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
