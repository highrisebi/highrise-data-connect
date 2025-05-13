
import React from 'react';
import { useParams } from 'react-router-dom';

const Editor = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">{isEditing ? 'Edit Post' : 'Create New Post'}</h1>
      {isEditing && <p className="text-gray-600 mb-4">Editing post with ID: {id}</p>}
      <div className="bg-gray-100 p-6 rounded-lg">
        <p>Editor Placeholder - Rich text editor will be integrated here</p>
      </div>
    </div>
  );
};

export default Editor;
