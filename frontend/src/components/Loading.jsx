// src/LoadingScreen.js
import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="text-center">
        <svg className="w-12 h-12 text-gray-200 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v7l5 5M4 12a8 8 0 018-8v7L7 9l5 5v7a8 8 0 01-8-8z" />
        </svg>
        <p className="mt-4 text-gray-200 text-lg">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
