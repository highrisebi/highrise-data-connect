
import React from 'react';

const Homepage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-3xl px-4">
        <h1 className="text-4xl font-bold mb-4">Welcome to HighriseBI</h1>
        <p className="text-xl text-gray-600 mb-8">Data analytics, reporting, and community engagement for SMEs</p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
            Get a Free Excel Audit
          </button>
          <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
