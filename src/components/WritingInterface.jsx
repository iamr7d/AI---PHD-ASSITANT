import React, { useState, useRef, useEffect, useCallback } from 'react';
import { improveText, analyzePaper, checkWriting } from '../services/groq';
import { debounce } from 'lodash';

function WritingInterface({ darkMode }) {
  const [text, setText] = useState('');
  const [mode, setMode] = useState('write');
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [error, setError] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState('academic');
  const [selectedTone, setSelectedTone] = useState('formal');
  const [selectedFocus, setSelectedFocus] = useState('clarity');
  const [autoSaveStatus, setAutoSaveStatus] = useState('');
  const textareaRef = useRef(null);

  // Debounced auto-save
  const debouncedSave = useCallback(
    debounce((text) => {
      try {
        localStorage.setItem('draft', text);
        setAutoSaveStatus('Saved');
        setTimeout(() => setAutoSaveStatus(''), 2000);
      } catch (error) {
        console.error('Error saving draft:', error);
        setAutoSaveStatus('Error saving');
      }
    }, 1000),
    []
  );

  // Auto-save effect
  useEffect(() => {
    if (text.trim()) {
      debouncedSave(text);
    }
    return () => debouncedSave.cancel();
  }, [text, debouncedSave]);

  // Load saved draft
  useEffect(() => {
    const savedDraft = localStorage.getItem('draft');
    if (savedDraft) {
      setText(savedDraft);
    }
  }, []);

  const writingStyles = [
    { id: 'academic', label: '🎓 Academic', desc: 'Scholarly and research-oriented' },
    { id: 'technical', label: '⚙️ Technical', desc: 'Precise and detailed' },
    { id: 'scientific', label: '🔬 Scientific', desc: 'Data-driven and methodical' }
  ];

  const toneOptions = [
    { id: 'formal', label: '👔 Formal', desc: 'Professional and structured' },
    { id: 'objective', label: '🎯 Objective', desc: 'Unbiased and factual' },
    { id: 'analytical', label: '📊 Analytical', desc: 'Critical and evaluative' }
  ];

  const focusAreas = [
    { id: 'clarity', label: '💡 Clarity', desc: 'Clear and understandable' },
    { id: 'conciseness', label: '✂️ Conciseness', desc: 'Brief and to the point' },
    { id: 'coherence', label: '🔄 Coherence', desc: 'Logical flow of ideas' }
  ];

  const handleTextChange = (e) => {
    setText(e.target.value);
    setAutoSaveStatus('Saving...');
  };

  const handleTabKey = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newText = text.substring(0, start) + '    ' + text.substring(end);
      setText(newText);
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 4;
      }, 0);
    }
  };

  const getWordCount = () => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const getCharacterCount = () => {
    return text.length;
  };

  const handleImproveText = async () => {
    if (!text.trim()) return;
    
    setIsProcessing(true);
    setError(null);
    
    try {
      const result = await improveText(text, {
        style: selectedStyle,
        tone: selectedTone,
        focus: selectedFocus
      });
      setAiResponse(result);
    } catch (err) {
      setError(err.message || 'An error occurred while processing your text');
      console.error('Text improvement error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAnalyzePaper = async () => {
    if (!text.trim()) return;
    
    setIsProcessing(true);
    setError(null);
    
    try {
      const result = await analyzePaper(text, {
        style: selectedStyle,
        tone: selectedTone,
        focus: selectedFocus
      });
      setAiResponse(result);
    } catch (err) {
      setError(err.message || 'An error occurred while processing your text');
      console.error('Text analysis error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCheckWriting = async () => {
    if (!text.trim()) return;
    
    setIsProcessing(true);
    setError(null);
    
    try {
      const result = await checkWriting(text, {
        style: selectedStyle,
        tone: selectedTone,
        focus: selectedFocus
      });
      setAiResponse(result);
    } catch (err) {
      setError(err.message || 'An error occurred while processing your text');
      console.error('Text checking error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(mode === 'preview' ? aiResponse : text);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="p-4 space-y-4">
          {/* Mode Switcher and Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setMode('write')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${mode === 'write'
                    ? `${darkMode ? 'bg-gray-700' : 'bg-primary/10'} text-primary`
                    : `${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`
                  }`}
              >
                ✍️ Write
              </button>
              <button
                onClick={() => setMode('preview')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${mode === 'preview'
                    ? `${darkMode ? 'bg-gray-700' : 'bg-primary/10'} text-primary`
                    : `${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`
                  }`}
              >
                👁️ Preview
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {autoSaveStatus}
              </span>
              <button
                onClick={copyToClipboard}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                📋 Copy
              </button>
              <button
                onClick={() => setText('')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                🗑️ Clear
              </button>
            </div>
          </div>

          {/* Writing Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Writing Style */}
            <div className="relative group">
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg text-sm font-medium appearance-none transition-colors duration-200
                  ${darkMode
                    ? 'bg-gray-700 text-gray-200 border-gray-600 focus:border-primary'
                    : 'bg-gray-50 text-gray-900 border-gray-200 focus:border-primary'
                  }`}
              >
                {writingStyles.map(style => (
                  <option key={style.id} value={style.id}>
                    {style.label}
                  </option>
                ))}
              </select>
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2">🎨</span>
              <div className={`absolute left-0 w-full mt-2 p-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 
                ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {writingStyles.find(s => s.id === selectedStyle)?.desc}
                </p>
              </div>
            </div>

            {/* Tone */}
            <div className="relative group">
              <select
                value={selectedTone}
                onChange={(e) => setSelectedTone(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg text-sm font-medium appearance-none transition-colors duration-200
                  ${darkMode
                    ? 'bg-gray-700 text-gray-200 border-gray-600 focus:border-primary'
                    : 'bg-gray-50 text-gray-900 border-gray-200 focus:border-primary'
                  }`}
              >
                {toneOptions.map(tone => (
                  <option key={tone.id} value={tone.id}>
                    {tone.label}
                  </option>
                ))}
              </select>
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2">🎭</span>
              <div className={`absolute left-0 w-full mt-2 p-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 
                ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {toneOptions.find(t => t.id === selectedTone)?.desc}
                </p>
              </div>
            </div>

            {/* Focus Area */}
            <div className="relative group">
              <select
                value={selectedFocus}
                onChange={(e) => setSelectedFocus(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg text-sm font-medium appearance-none transition-colors duration-200
                  ${darkMode
                    ? 'bg-gray-700 text-gray-200 border-gray-600 focus:border-primary'
                    : 'bg-gray-50 text-gray-900 border-gray-200 focus:border-primary'
                  }`}
              >
                {focusAreas.map(focus => (
                  <option key={focus.id} value={focus.id}>
                    {focus.label}
                  </option>
                ))}
              </select>
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2">🎯</span>
              <div className={`absolute left-0 w-full mt-2 p-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 
                ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {focusAreas.find(f => f.id === selectedFocus)?.desc}
                </p>
              </div>
            </div>
          </div>

          {/* AI Actions */}
          <div className="flex items-center space-x-2 overflow-x-auto">
            <button
              onClick={handleImproveText}
              disabled={isProcessing || !text.trim()}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap
                ${darkMode ? 'bg-primary text-white hover:bg-primary-600' : 'bg-primary text-white hover:bg-primary-600'}`}
            >
              {isProcessing ? '⏳ Processing...' : '✨ Improve Writing'}
            </button>
            <button
              onClick={handleAnalyzePaper}
              disabled={isProcessing || !text.trim()}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap
                ${darkMode ? 'bg-primary text-white hover:bg-primary-600' : 'bg-primary text-white hover:bg-primary-600'}`}
            >
              {isProcessing ? '⏳ Processing...' : '🔍 Analyze Paper'}
            </button>
            <button
              onClick={handleCheckWriting}
              disabled={isProcessing || !text.trim()}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap
                ${darkMode ? 'bg-primary text-white hover:bg-primary-600' : 'bg-primary text-white hover:bg-primary-600'}`}
            >
              {isProcessing ? '⏳ Processing...' : '✅ Check Writing'}
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-4">
        {mode === 'write' ? (
          <div className="h-full relative">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={handleTextChange}
              onKeyDown={handleTabKey}
              placeholder="Start writing your academic content here..."
              className={`w-full h-full p-4 rounded-lg resize-none focus:ring-2 transition-colors duration-200
                ${darkMode
                  ? 'bg-gray-700 text-gray-200 placeholder-gray-400'
                  : 'bg-white text-gray-900 placeholder-gray-400'
                }
                focus:ring-primary focus:border-transparent`}
              style={{ minHeight: '500px' }}
            ></textarea>
          </div>
        ) : (
          <div className={`h-full p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
            <div className={`prose max-w-none ${darkMode ? 'prose-invert' : ''}`}>
              {aiResponse || 'No content to preview'}
              {error && <p className="text-red-500">{error}</p>}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-4`}>
        <div className="flex justify-between items-center text-sm">
          <div className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {getWordCount()} words | {getCharacterCount()} characters
          </div>
          <div className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {selectedStyle} • {selectedTone} • {selectedFocus}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WritingInterface;
