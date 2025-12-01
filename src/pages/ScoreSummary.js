import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useHighScores } from '../context/HighScoreContext';
import { useTheme } from '../context/ThemeContext';

const ScoreSummary = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { addScore } = useHighScores();
  const { isDark } = useTheme();
  const [initials, setInitials] = useState('');
  const [saved, setSaved] = useState(false);

  const score = state?.score || 0;
  const total = state?.total || 0;
  const category = state?.category || 'General';

  const percentage = Math.round((score / total) * 100) || 0;

  const handleSave = (e) => {
    e.preventDefault();
    if (!initials.trim()) return;

    addScore({
      initials: initials.toUpperCase(),
      score: score,
      total: total,
      category: category,
      date: new Date().toLocaleDateString()
    });
    setSaved(true);
  };

  return (
    <div className={`max-w-md mx-auto mt-10 p-8 rounded-xl shadow-lg text-center transition-colors duration-200 ${
      isDark ? 'bg-gray-800' : 'bg-white'
    }`}>
      <h2 className={`text-4xl font-bold mb-4 ${
        isDark ? 'text-blue-400' : 'text-blue-600'
      }`}>Quiz Completed!</h2>
      
      <div className={`text-6xl font-extrabold mb-2 ${
        isDark ? 'text-gray-100' : 'text-gray-800'
      }`}>
        {score} <span className={`text-2xl ${
          isDark ? 'text-gray-500' : 'text-gray-400'
        }`}>/ {total}</span>
      </div>
      <p className={`text-xl mb-8 ${
        isDark ? 'text-gray-300' : 'text-gray-600'
      }`}>{percentage}% Correct</p>

      {!saved ? (
        <form onSubmit={handleSave} className={`mb-8 p-4 rounded-lg transition-colors duration-200 ${
          isDark ? 'bg-gray-700' : 'bg-gray-50'
        }`}>
          <label className={`block text-sm font-bold mb-2 ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Enter Initials to Save Score
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              maxLength="3"
              value={initials}
              onChange={(e) => setInitials(e.target.value)}
              className={`flex-1 p-2 border rounded uppercase text-center font-bold tracking-widest transition-colors duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-gray-100' : 'bg-white border-gray-300 text-gray-900'
              }`}
              placeholder="ABC"
              required
            />
            <button 
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 font-bold transition-colors duration-200"
            >
              Save
            </button>
          </div>
        </form>
      ) : (
        <div className={`mb-8 p-4 rounded-lg font-bold transition-colors duration-200 ${
          isDark ? 'bg-green-800 text-green-200' : 'bg-green-100 text-green-700'
        }`}>
          Score Saved Successfully!
        </div>
      )}

      <div className="flex flex-col gap-3">
        <button
          onClick={() => navigate('/')}
          className={`w-full py-3 rounded font-bold transition-colors duration-200 ${
            isDark ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-800 text-white hover:bg-gray-900'
          }`}
        >
          Play Again
        </button>
        <button
          onClick={() => navigate('/highscores')}
          className={`w-full py-3 border rounded transition-colors duration-200 ${
            isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          View High Scores
        </button>
      </div>
    </div>
  );
};

export default ScoreSummary;