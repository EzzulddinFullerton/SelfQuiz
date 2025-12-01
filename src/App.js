import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import ScoreSummary from './pages/ScoreSummary';
import HighScores from './pages/HighScores';
import { HighScoreProvider } from './context/HighScoreContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function AppContent() {
  const { isDark } = useTheme();
  
  return (
    <HighScoreProvider>
      <Router>
        <div className={`min-h-screen font-sans transition-colors duration-200 ${
          isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-800'
        }`}>
          <Navbar />
          <div className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/score" element={<ScoreSummary />} />
              <Route path="/highscores" element={<HighScores />} />
            </Routes>
          </div>
        </div>
      </Router>
    </HighScoreProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;