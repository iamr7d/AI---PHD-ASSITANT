import { useState, useRef } from 'react';
import { clsx } from 'clsx';
import { 
  BoltIcon,
  DocumentIcon,
  ListBulletIcon,
  ChatBubbleLeftRightIcon,
  PhotoIcon,
  LinkIcon,
  CodeBracketIcon,
  DocumentDuplicateIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  CloudArrowUpIcon,
  Bars3BottomLeftIcon,
  Bars3Icon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';
import AIAssistantPanel from '../ai/AIAssistantPanel';

export default function WriteTab({ darkMode }) {
  const [content, setContent] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showAIPanel, setShowAIPanel] = useState(true);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);

  const updateCounts = (text) => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    setWordCount(words);
    setCharCount(text.length);
  };

  const handleChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    updateCounts(newContent);
    
    // Add to history
    if (historyIndex < history.length - 1) {
      // If we're in the middle of the history, truncate it
      setHistory(history.slice(0, historyIndex + 1));
    }
    setHistory([...history, newContent]);
    setHistoryIndex(history.length);
  };

  const formatButtons = [
    { icon: BoltIcon, label: 'Bold', action: () => formatText('**', '**') },
    { icon: DocumentIcon, label: 'Italic', action: () => formatText('*', '*') },
    { icon: ListBulletIcon, label: 'List', action: () => formatText('- ', '', 'start') },
    { icon: ChatBubbleLeftRightIcon, label: 'Quote', action: () => formatText('> ', '', 'start') },
    { icon: CodeBracketIcon, label: 'Code', action: () => formatText('```\\n', '\\n```') },
    { icon: LinkIcon, label: 'Link', action: () => formatText('[', '](url)') },
  ];

  const toolbarButtons = [
    { 
      icon: PhotoIcon, 
      label: 'Insert Image',
      action: () => fileInputRef.current?.click()
    },
    { 
      icon: DocumentDuplicateIcon, 
      label: 'Copy All',
      action: () => {
        navigator.clipboard.writeText(content);
        toast.success('Content copied to clipboard!');
      }
    },
    { 
      icon: ArrowUturnLeftIcon, 
      label: 'Undo',
      disabled: historyIndex <= 0,
      action: () => {
        if (historyIndex > 0) {
          setHistoryIndex(historyIndex - 1);
          setContent(history[historyIndex - 1]);
          updateCounts(history[historyIndex - 1]);
        }
      }
    },
    { 
      icon: ArrowUturnRightIcon, 
      label: 'Redo',
      disabled: historyIndex >= history.length - 1,
      action: () => {
        if (historyIndex < history.length - 1) {
          setHistoryIndex(historyIndex + 1);
          setContent(history[historyIndex + 1]);
          updateCounts(history[historyIndex + 1]);
        }
      }
    },
  ];

  const formatText = (prefix, suffix, position = 'surround') => {
    const textarea = document.querySelector('textarea');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let newContent;
    if (position === 'surround') {
      newContent = 
        content.substring(0, start) +
        prefix + selectedText + suffix +
        content.substring(end);
    } else {
      // Handle start of line formatting (lists, quotes)
      const lines = selectedText.split('\\n');
      const formattedLines = lines.map(line => prefix + line);
      newContent = 
        content.substring(0, start) +
        formattedLines.join('\\n') +
        content.substring(end);
    }
    
    setContent(newContent);
    updateCounts(newContent);
    
    // Restore focus and selection
    textarea.focus();
    const newPosition = position === 'surround' 
      ? end + prefix.length + suffix.length
      : end + prefix.length * lines.length;
    textarea.setSelectionRange(newPosition, newPosition);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Here you would typically upload to your server/cloud storage
    // For now, we'll just create a local URL
    const reader = new FileReader();
    reader.onloadend = () => {
      formatText('![', '](' + reader.result + ')');
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Document saved successfully!');
    } catch (error) {
      toast.error('Failed to save document');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={clsx(
      'h-full',
      darkMode ? 'text-gray-100' : 'text-gray-900'
    )}>
      {/* Top Toolbar */}
      <div className={clsx(
        'sticky top-0 z-10 mb-4',
        'flex flex-wrap items-center gap-2 p-3 rounded-lg',
        darkMode ? 'bg-gray-800' : 'bg-gray-50'
      )}>
        <div className="flex items-center gap-1">
          {formatButtons.map((button, index) => (
            <button
              key={index}
              onClick={button.action}
              className={clsx(
                'p-2 rounded-md transition-all tooltip',
                darkMode 
                  ? 'hover:bg-gray-700 text-gray-300 hover:text-white' 
                  : 'hover:bg-white text-gray-600 hover:text-gray-900'
              )}
              title={button.label}
            >
              <button.icon className="h-5 w-5" />
            </button>
          ))}
        </div>

        <div className={clsx(
          'h-6 w-px mx-2',
          darkMode ? 'bg-gray-700' : 'bg-gray-300'
        )} />
        
        <select 
          className={clsx(
            'text-sm font-medium px-3 py-1.5 rounded-md transition-all border-0 focus:ring-0',
            darkMode 
              ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
              : 'bg-transparent hover:bg-white text-gray-600'
          )}
        >
          <option>Paragraph</option>
          <option>Heading 1</option>
          <option>Heading 2</option>
          <option>Heading 3</option>
        </select>

        <select 
          className={clsx(
            'text-sm font-medium px-3 py-1.5 rounded-md transition-all border-0 focus:ring-0',
            darkMode 
              ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
              : 'bg-transparent hover:bg-white text-gray-600'
          )}
        >
          <option>Times New Roman</option>
          <option>Arial</option>
          <option>Poppins</option>
        </select>

        <div className={clsx(
          'h-6 w-px mx-2',
          darkMode ? 'bg-gray-700' : 'bg-gray-300'
        )} />

        <div className="flex items-center gap-1">
          {toolbarButtons.map((button, index) => (
            <button
              key={index}
              onClick={button.action}
              disabled={button.disabled}
              className={clsx(
                'p-2 rounded-md transition-all tooltip',
                darkMode 
                  ? 'hover:bg-gray-700 text-gray-300 hover:text-white' 
                  : 'hover:bg-white text-gray-600 hover:text-gray-900',
                button.disabled && 'opacity-50 cursor-not-allowed'
              )}
              title={button.label}
            >
              <button.icon className="h-5 w-5" />
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => setShowAIPanel(!showAIPanel)}
            className={clsx(
              'p-2 rounded-md transition-all',
              darkMode
                ? 'hover:bg-gray-700 text-gray-300 hover:text-white'
                : 'hover:bg-white text-gray-600 hover:text-gray-900'
            )}
            title="Toggle AI Assistant"
          >
            <AdjustmentsHorizontalIcon className="h-5 w-5" />
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className={clsx(
              'flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all',
              darkMode
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white',
              saving && 'opacity-75 cursor-wait'
            )}
          >
            <CloudArrowUpIcon className="h-5 w-5" />
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Editor */}
        <div className={clsx(
          'lg:col-span-2',
          !showAIPanel && 'lg:col-span-3'
        )}>
          <div className={clsx(
            'relative rounded-lg border h-[calc(100vh-200px)]',
            darkMode 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          )}>
            <textarea
              value={content}
              onChange={handleChange}
              placeholder="Start writing your masterpiece..."
              className={clsx(
                'w-full h-full p-4 rounded-lg resize-none',
                'focus:ring-0 focus:outline-none',
                darkMode 
                  ? 'bg-gray-800 text-gray-100 placeholder-gray-500' 
                  : 'bg-white text-gray-900 placeholder-gray-400'
              )}
            />
            
            <div className={clsx(
              'absolute bottom-0 right-0 p-2 text-xs',
              darkMode ? 'text-gray-400' : 'text-gray-500'
            )}>
              {wordCount} words | {charCount} characters
            </div>
          </div>
        </div>

        {/* AI Assistant Panel */}
        {showAIPanel && (
          <div className="lg:col-span-1">
            <AIAssistantPanel 
              content={content}
              darkMode={darkMode}
            />
          </div>
        )}
      </div>

      {/* Hidden file input for image upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}
