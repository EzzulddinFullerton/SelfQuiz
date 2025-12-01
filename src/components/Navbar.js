import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <nav className={`p-4 shadow-md transition-colors duration-200 ${
      isDark ? 'bg-gray-800 text-gray-100' : 'bg-blue-600 text-white'
    }`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">SelfQuiz</Link>
        <div className="flex items-center space-x-4">
          <Link to="/" className={`hover:${isDark ? 'text-gray-300' : 'text-blue-200'}`}>New Quiz</Link>
          <Link to="/highscores" className={`hover:${isDark ? 'text-gray-300' : 'text-blue-200'}`}>High Scores</Link>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-blue-700 hover:bg-blue-800'
            }`}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;