import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';

const Quiz = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  
  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const decodeHTML = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  useEffect(() => {
    if (!state) {
      navigate('/');
      return;
    }

    const { amount, category, difficulty } = state;
    const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;

    axios.get(url).then(res => {
      setQuestions(res.data.results);
      setLoading(false);
    });
  }, [state, navigate]);

  useEffect(() => {
    if (questions.length > 0 && currentQIndex < questions.length) {
      const currentQuestion = questions[currentQIndex];
      const answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
      setShuffledAnswers(answers.sort(() => Math.random() - 0.5));
      setIsAnswered(false);
      setSelectedAnswer(null);
    }
  }, [questions, currentQIndex]);

  const handleAnswerClick = (answer) => {
    if (isAnswered) return;

    setIsAnswered(true);
    setSelectedAnswer(answer);

    const isCorrect = answer === questions[currentQIndex].correct_answer;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQIndex + 1 < questions.length) {
        setCurrentQIndex(prev => prev + 1);
      } else {
        navigate('/score', { 
          state: { 
            score: isCorrect ? score + 1 : score,
            total: questions.length,
            category: questions[0].category
          } 
        });
      }
    }, 1500);
  };

  if (loading) return <div className="text-center mt-20 text-xl">Loading Questions...</div>;
  if (questions.length === 0) return <div className="text-center mt-20 text-xl">No questions found. Try different settings.</div>;

  const currentQuestion = questions[currentQIndex];

  return (
    <div className={`max-w-2xl mx-auto mt-8 p-6 rounded-lg shadow-lg transition-colors duration-200 ${
      isDark ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className={`flex justify-between mb-4 text-sm font-bold uppercase ${
        isDark ? 'text-gray-400' : 'text-gray-500'
      }`}>
        <span>{currentQuestion.category}</span>
        <span>{currentQuestion.difficulty}</span>
      </div>

      <div className={`mb-2 ${
        isDark ? 'text-gray-500' : 'text-gray-400'
      }`}>
        Question {currentQIndex + 1} of {questions.length}
      </div>

      <h2 className={`text-2xl font-bold mb-6 ${
        isDark ? 'text-gray-100' : 'text-gray-800'
      }`}>
        {decodeHTML(currentQuestion.question)}
      </h2>

      <div className="grid gap-4">
        {shuffledAnswers.map((ans, index) => {
          let btnClass = "w-full p-4 text-left rounded border transition-colors duration-200 font-semibold ";
          
          if (isAnswered) {
             if (ans === currentQuestion.correct_answer) {
                 btnClass += "bg-green-500 text-white border-green-600";
             } else if (ans === selectedAnswer) {
                 btnClass += "bg-red-500 text-white border-red-600";
             } else {
                 btnClass += isDark ? "bg-gray-700 text-gray-500 opacity-50" : "bg-gray-100 text-gray-400 opacity-50";
             }
          } else {
              btnClass += isDark 
                ? "bg-gray-700 hover:bg-gray-600 hover:border-blue-400 text-gray-200 border-gray-600" 
                : "bg-gray-50 hover:bg-blue-50 hover:border-blue-300 text-gray-700 border-gray-300";
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswerClick(ans)}
              className={btnClass}
              disabled={isAnswered}
            >
              {decodeHTML(ans)}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Quiz;