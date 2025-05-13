
import React from 'react';

// This is a placeholder component for CKEditor
// We would normally integrate the actual CKEditor 5 here
interface CKEditorProps {
  initialValue?: string;
  onChange: (content: string) => void;
}

const CKEditor: React.FC<CKEditorProps> = ({ initialValue = '', onChange }) => {
  return (
    <div className="border border-gray-300 rounded-md p-4">
      <h3 className="text-lg font-medium mb-2">Rich Text Editor Placeholder</h3>
      <p className="text-gray-500 mb-4">
        CKEditor integration will be implemented here. For now, we'll use a simple textarea.
      </p>
      <textarea
        className="w-full h-64 p-2 border border-gray-300 rounded"
        value={initialValue}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your content here..."
      />
    </div>
  );
};

export default CKEditor;
