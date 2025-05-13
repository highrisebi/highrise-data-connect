
import React, { useState, useEffect } from 'react';

// This is an enhanced version of the placeholder CKEditor component
interface CKEditorProps {
  initialValue?: string;
  onChange: (content: string) => void;
}

const CKEditor: React.FC<CKEditorProps> = ({ initialValue = '', onChange }) => {
  const [content, setContent] = useState(initialValue);
  const [showYoutubeInput, setShowYoutubeInput] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');

  // Update local state when initialValue prop changes
  useEffect(() => {
    setContent(initialValue);
  }, [initialValue]);

  // Handle content change
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    onChange(e.target.value);
  };

  // Handle toolbar actions
  const handleBold = () => {
    insertFormattedText('<strong>', '</strong>');
  };

  const handleItalic = () => {
    insertFormattedText('<em>', '</em>');
  };

  const handleHeading = () => {
    insertFormattedText('<h2>', '</h2>');
  };

  const handleList = () => {
    insertFormattedText('<ul>\n  <li>', '</li>\n</ul>');
  };

  const handleOrderedList = () => {
    insertFormattedText('<ol>\n  <li>', '</li>\n</ol>');
  };

  const handleLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      insertFormattedText(`<a href="${url}" target="_blank" rel="noopener noreferrer">`, '</a>');
    }
  };

  // Helper function to insert formatting tags around selected text
  const insertFormattedText = (openTag: string, closeTag: string) => {
    const textarea = document.getElementById('editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const newText = content.substring(0, start) + openTag + selectedText + closeTag + content.substring(end);
    
    setContent(newText);
    onChange(newText);
    
    // Focus and set selection after update
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = start + openTag.length;
      textarea.selectionEnd = start + openTag.length + selectedText.length;
    }, 0);
  };

  // Handle YouTube embedding
  const toggleYoutubeInput = () => {
    setShowYoutubeInput(!showYoutubeInput);
  };

  const handleYoutubeEmbed = () => {
    if (!youtubeUrl) {
      return;
    }

    let videoId = '';
    try {
      // Extract video ID from YouTube URL
      const url = new URL(youtubeUrl);
      if (url.hostname === 'youtu.be') {
        videoId = url.pathname.slice(1);
      } else if (url.hostname === 'www.youtube.com' || url.hostname === 'youtube.com') {
        videoId = url.searchParams.get('v') || '';
      }
    } catch (e) {
      console.error('Invalid URL:', e);
    }

    if (videoId) {
      const embedCode = `<div class="aspect-w-16 aspect-h-9 mb-4">
  <iframe 
    src="https://www.youtube.com/embed/${videoId}" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen
    class="w-full h-full"
  ></iframe>
</div>`;
      
      const newContent = content + embedCode;
      setContent(newContent);
      onChange(newContent);
      setYoutubeUrl('');
      setShowYoutubeInput(false);
    }
  };

  return (
    <div className="border border-gray-300 rounded-md">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border-b border-gray-300">
        <button 
          type="button" 
          onClick={handleBold}
          className="p-2 hover:bg-gray-200 rounded"
          title="Bold"
        >
          <span className="font-bold">B</span>
        </button>
        <button 
          type="button" 
          onClick={handleItalic}
          className="p-2 hover:bg-gray-200 rounded"
          title="Italic"
        >
          <span className="italic">I</span>
        </button>
        <button 
          type="button" 
          onClick={handleHeading}
          className="p-2 hover:bg-gray-200 rounded"
          title="Heading"
        >
          <span className="font-bold">H</span>
        </button>
        <button 
          type="button" 
          onClick={handleList}
          className="p-2 hover:bg-gray-200 rounded"
          title="Bullet List"
        >
          <span>• List</span>
        </button>
        <button 
          type="button" 
          onClick={handleOrderedList}
          className="p-2 hover:bg-gray-200 rounded"
          title="Numbered List"
        >
          <span>1. List</span>
        </button>
        <button 
          type="button" 
          onClick={handleLink}
          className="p-2 hover:bg-gray-200 rounded"
          title="Insert Link"
        >
          <span className="underline">Link</span>
        </button>
        <button 
          type="button" 
          onClick={toggleYoutubeInput}
          className="p-2 hover:bg-gray-200 rounded"
          title="Embed YouTube Video"
        >
          <span className="text-red-600">YouTube</span>
        </button>
      </div>

      {/* YouTube Embed UI */}
      {showYoutubeInput && (
        <div className="p-3 bg-gray-50 border-b border-gray-300 flex gap-2">
          <input
            type="text"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="Paste YouTube URL"
            className="flex-grow p-2 text-sm border border-gray-300 rounded"
          />
          <button
            type="button"
            onClick={handleYoutubeEmbed}
            className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
          >
            Embed
          </button>
        </div>
      )}

      {/* Editor Area */}
      <textarea
        id="editor"
        className="w-full h-64 p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={content}
        onChange={handleChange}
        placeholder="Write your content here... Use the toolbar for formatting."
      />

      {/* Preview */}
      <div className="border-t border-gray-300">
        <div className="p-3 bg-gray-50 text-sm font-medium">Preview</div>
        <div 
          className="p-3 prose max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

export default CKEditor;
