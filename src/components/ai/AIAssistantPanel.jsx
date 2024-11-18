import React, { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { 
  SparklesIcon,
  ClipboardDocumentCheckIcon,
  ChatBubbleLeftRightIcon,
  BookOpenIcon,
  ShieldCheckIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { 
  getWritingSuggestions, 
  getCitationSuggestions, 
  getGrammarCheck,
  getPlagiarismCheck 
} from '../../services/ai';

const DEBOUNCE_DELAY = 1000;

export default function AIAssistantPanel({ content, darkMode }) {
  const [activeTab, setActiveTab] = useState('suggestions');
  const [suggestions, setSuggestions] = useState('');
  const [citations, setCitations] = useState('');
  const [grammar, setGrammar] = useState('');
  const [plagiarism, setPlagiarism] = useState('');
  const [loading, setLoading] = useState({});

  const tabs = [
    { 
      id: 'suggestions', 
      label: 'Suggestions', 
      icon: SparklesIcon,
      action: getWritingSuggestions,
      setState: setSuggestions,
      content: suggestions
    },
    { 
      id: 'grammar', 
      label: 'Grammar', 
      icon: ClipboardDocumentCheckIcon,
      action: getGrammarCheck,
      setState: setGrammar,
      content: grammar
    },
    { 
      id: 'citations', 
      label: 'Citations', 
      icon: ChatBubbleLeftRightIcon,
      action: getCitationSuggestions,
      setState: setCitations,
      content: citations
    },
    { 
      id: 'plagiarism', 
      label: 'Plagiarism', 
      icon: ShieldCheckIcon,
      action: getPlagiarismCheck,
      setState: setPlagiarism,
      content: plagiarism
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (content.trim().length > 50) {
        updateActiveTab();
      }
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [content, activeTab]);

  const updateActiveTab = async () => {
    const tab = tabs.find(t => t.id === activeTab);
    if (!tab) return;

    setLoading(prev => ({ ...prev, [activeTab]: true }));
    try {
      const result = await tab.action(content);
      tab.setState(result);
    } catch (error) {
      console.error(`Error updating ${activeTab}:`, error);
    } finally {
      setLoading(prev => ({ ...prev, [activeTab]: false }));
    }
  };

  const handleRefresh = async () => {
    updateActiveTab();
  };

  return (
    <div className={clsx(
      'h-full flex flex-col rounded-lg border overflow-hidden',
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    )}>
      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={clsx(
              'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors',
              activeTab === tab.id
                ? darkMode
                  ? 'border-blue-500 text-blue-500'
                  : 'border-blue-600 text-blue-600'
                : darkMode
                  ? 'border-transparent text-gray-400 hover:text-gray-300'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
            )}
          >
            <tab.icon className="h-5 w-5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className={clsx(
            'text-lg font-semibold',
            darkMode ? 'text-white' : 'text-gray-900'
          )}>
            {tabs.find(t => t.id === activeTab)?.label} Analysis
          </h3>
          <button
            onClick={handleRefresh}
            disabled={loading[activeTab]}
            className={clsx(
              'p-2 rounded-lg transition-colors',
              darkMode
                ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900',
              loading[activeTab] && 'opacity-50 cursor-wait'
            )}
          >
            <ArrowPathIcon className={clsx(
              'h-5 w-5',
              loading[activeTab] && 'animate-spin'
            )} />
          </button>
        </div>

        {content.trim().length < 50 ? (
          <div className={clsx(
            'text-center py-8',
            darkMode ? 'text-gray-400' : 'text-gray-500'
          )}>
            Start writing to get AI assistance
          </div>
        ) : loading[activeTab] ? (
          <div className={clsx(
            'flex flex-col items-center justify-center py-8 space-y-4',
            darkMode ? 'text-gray-400' : 'text-gray-500'
          )}>
            <ArrowPathIcon className="h-8 w-8 animate-spin" />
            <p>Analyzing your text...</p>
          </div>
        ) : (
          <div className={clsx(
            'prose max-w-none',
            darkMode ? 'prose-invert' : 'prose-gray'
          )}>
            {tabs.find(t => t.id === activeTab)?.content || 'No suggestions yet'}
          </div>
        )}
      </div>
    </div>
  );
}
