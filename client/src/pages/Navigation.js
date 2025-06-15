import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="bg-gray-800 shadow-sm border-b border-gray-700">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-white hover:text-blue-400 transition-colors">
            jaden's forum
          </Link>
          <div className="flex space-x-8">
            <Link 
              to="/" 
              className="text-gray-300 hover:text-blue-400 font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/create" 
              className="text-gray-300 hover:text-blue-400 font-medium transition-colors"
            >
              Create Post
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation; 