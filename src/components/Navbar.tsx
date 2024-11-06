import React from 'react';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">ResumeMaker Pro</span>
          </Link>
          <div className="flex space-x-4">
            <Link
              to="/create"
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Create Resume
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}