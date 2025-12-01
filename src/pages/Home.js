import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [amount, setAmount] = useState(10);
  const navigate = useNavigate();
  const { isDark } = useTheme();

  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php')
      .then(res => setCategories(res.data.trivia_categories))
      .catch(err => console.error("Error fetching categories:", err));
  }, []);

  const handleStart = (e) => {
    e.preventDefault();
    navigate('/quiz', { state: { category, difficulty, amount } });
  };

  return (
    <div className={`max-w-md mx-auto rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-10 p-8 transition-colors duration-200 ${
      isDark ? 'bg-gray-800' : 'bg-white'
    }`}>
      <h2 className={`text-3xl font-bold text-center mb-6 ${
        isDark ? 'text-blue-400' : 'text-blue-600'
      }`}>Setup New Quiz</h2>
      
      <form onSubmit={handleStart} className="space-y-6">
        <div>
          <label className={`block font-bold mb-2 ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>Category</label>
          <select 
            className={`w-full border p-2 rounded transition-colors duration-200 ${
              isDark ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-gray-50 border-gray-300 text-gray-900'
            }`}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Any Category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={`block font-bold mb-2 ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>Difficulty</label>
          <div className="flex gap-2">
            {['easy', 'medium', 'hard'].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setDifficulty(level)}
                className={`flex-1 py-2 capitalize rounded border transition-colors duration-200 ${
                  difficulty === level 
                    ? 'bg-blue-500 text-white border-blue-500' 
                    : isDark 
                      ? 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600' 
                      : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={`block font-bold mb-2 ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>Number of Questions ({amount})</label>
          <input 
            type="range" 
            min="5" 
            max="50" 
            step="5"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={`w-full h-2 rounded-lg appearance-none cursor-pointer transition-colors duration-200 ${
              isDark ? 'bg-gray-600' : 'bg-gray-200'
            }`}
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded transition duration-200"
        >
          Start Quiz
        </button>
      </form>
    </div>
  );
};

export default Home;