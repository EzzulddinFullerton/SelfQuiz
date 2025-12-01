import React from 'react';
import { useHighScores } from '../context/HighScoreContext';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const HighScores = () => {
  const { highScores } = useHighScores();
  const { isDark } = useTheme();

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className={`text-3xl font-bold text-center mb-6 ${
        isDark ? 'text-gray-100' : 'text-gray-800'
      }`}>Leaderboard</h2>

      <div className={`shadow-md rounded-lg overflow-hidden transition-colors duration-200 ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}>
        {highScores.length === 0 ? (
          <div className={`p-8 text-center ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            No scores saved yet. Go play a quiz!
          </div>
        ) : (
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className={`px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase tracking-wider transition-colors duration-200 ${
                  isDark ? 'border-gray-600 bg-gray-700 text-gray-300' : 'border-gray-200 bg-gray-100 text-gray-600'
                }`}>
                  Rank
                </th>
                <th className={`px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase tracking-wider transition-colors duration-200 ${
                  isDark ? 'border-gray-600 bg-gray-700 text-gray-300' : 'border-gray-200 bg-gray-100 text-gray-600'
                }`}>
                  Player
                </th>
                <th className={`px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase tracking-wider transition-colors duration-200 ${
                  isDark ? 'border-gray-600 bg-gray-700 text-gray-300' : 'border-gray-200 bg-gray-100 text-gray-600'
                }`}>
                  Score
                </th>
                <th className={`px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase tracking-wider transition-colors duration-200 ${
                  isDark ? 'border-gray-600 bg-gray-700 text-gray-300' : 'border-gray-200 bg-gray-100 text-gray-600'
                }`}>
                  Category
                </th>
              </tr>
            </thead>
            <tbody>
              {highScores.map((entry, index) => (
                <tr key={index}>
                  <td className={`px-5 py-5 border-b text-sm transition-colors duration-200 ${
                    isDark ? 'border-gray-600 bg-gray-800' : 'border-gray-200 bg-white'
                  }`}>
                    <span className={`font-bold ${index < 3 ? 'text-yellow-500' : isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      #{index + 1}
                    </span>
                  </td>
                  <td className={`px-5 py-5 border-b text-sm font-bold transition-colors duration-200 ${
                    isDark ? 'border-gray-600 bg-gray-800 text-blue-400' : 'border-gray-200 bg-white text-blue-600'
                  }`}>
                    {entry.initials}
                  </td>
                  <td className={`px-5 py-5 border-b text-sm transition-colors duration-200 ${
                    isDark ? 'border-gray-600 bg-gray-800' : 'border-gray-200 bg-white'
                  }`}>
                    {entry.score} / {entry.total}
                  </td>
                  <td className={`px-5 py-5 border-b text-sm transition-colors duration-200 ${
                    isDark ? 'border-gray-600 bg-gray-800 text-gray-400' : 'border-gray-200 bg-white text-gray-500'
                  }`}>
                    {entry.category}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-6 text-center">
        <Link to="/" className={`hover:underline transition-colors duration-200 ${
          isDark ? 'text-blue-400' : 'text-blue-600'
        }`}>
          &larr; Back to Home
        </Link>
      </div>
    </div>
  );
};

export default HighScores;