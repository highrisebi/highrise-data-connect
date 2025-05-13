
import React from 'react';
import { useParams } from 'react-router-dom';

const Post = () => {
  const { id } = useParams();
  
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Post Details</h1>
      <p className="text-gray-600 mb-4">Viewing post with ID: {id}</p>
      <div className="bg-gray-100 p-6 rounded-lg">
        <p>Post Content Placeholder</p>
      </div>
    </div>
  );
};

export default Post;
