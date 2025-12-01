import React, { createContext, useState, useEffect, useContext } from 'react';

const HighScoreContext = createContext();

export const useHighScores = () => useContext(HighScoreContext);

export const HighScoreProvider = ({ children }) => {
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    const savedScores = JSON.parse(localStorage.getItem('selfQuizHighScores')) || [];
    setHighScores(savedScores);
  }, []);

  const addScore = (scoreData) => {
    const newScores = [...highScores, scoreData];
    newScores.sort((a, b) => b.score - a.score);
    const topScores = newScores.slice(0, 10);
    
    setHighScores(topScores);
    localStorage.setItem('selfQuizHighScores', JSON.stringify(topScores));
  };

  return (
    <HighScoreContext.Provider value={{ highScores, addScore }}>
      {children}
    </HighScoreContext.Provider>
  );
};