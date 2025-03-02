import React, { useEffect, useState } from "react";
import axios from "axios";
import Confetti from "react-confetti";
import "../Game.css";

const Game = () => {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    setResult(null);
    setSelectedAnswer("");
    try {
      const res = await axios.get("https://game-backend-2-5wlb.onrender.com/question");
      const fetchedQuestion = res.data;
  
      // Generate 3 random incorrect answers (ensuring uniqueness and excluding the correct city)
      const incorrectAnswers = ["Paris", "Tokyo", "New York", "Sydney"]; // Example options
      const filteredIncorrect = incorrectAnswers.filter(city => city !== fetchedQuestion.city);
      const selectedIncorrect = filteredIncorrect.sort(() => 0.5 - Math.random()).slice(0, 3);
  
      // Ensure only one correct city in the options
      const shuffledOptions = [...selectedIncorrect, fetchedQuestion.city].sort(() => 0.5 - Math.random());
  
      setQuestion({ ...fetchedQuestion, options: shuffledOptions });
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  const submitAnswer = () => {
    if (!selectedAnswer) {
      alert("Please select an answer!");
      return;
    }

    const isCorrect = selectedAnswer === question.city;

    let funFacts = Array.isArray(question.funfact) 
      ? question.funfact.map(fact => fact.replace(/\[|\]|'/g, "").replace(/, /g, "\n"))
      : [question.funfact.replace(/\[|\]|'/g, "").replace(/, /g, "\n")];

    if (isCorrect) {
      setScore((prevScore) => ({ ...prevScore, correct: prevScore.correct + 1 }));
      setResult({ correct: true, message: "🎉 Correct!", fact: funFacts });
    } else {
      setScore((prevScore) => ({ ...prevScore, incorrect: prevScore.incorrect + 1 }));
      setResult({ correct: false, message: "😢 Incorrect!", fact: funFacts });
    }
  };

  const resetGame = () => {
    setScore({ correct: 0, incorrect: 0 });
    fetchQuestion();
  };

  return (
    <div className="game-container">
      <h1>🧩 The Globetrotter Challenge</h1>
      <h3 className="score">🏆 Score: ✅ {score.correct} | ❌ {score.incorrect}</h3>

      {question && !result && (
        <div className="question-card">
          <h2>🗺️ Destination Clues</h2>
          {question.clues.map((clue, index) => (
            <p key={index} className="clue">✨ {clue.replace(/\[|\]|'/g, "").replace(/, /g, "\n")}</p>
          ))}

          <h3>📍 Located in: <span className="country">{question.country}</span></h3>

          <div className="options">
            {question.options.map((option, index) => (
              <button key={index} onClick={() => setSelectedAnswer(option)}>
                {option}
              </button>
            ))}
          </div>
          <button className="submit-btn" onClick={submitAnswer}>🚀 Submit Answer</button>
        </div>
      )}

      {result && (
        <div className="result-box">
          {result.correct ? <Confetti /> : <p className="sad-face">😢</p>}
          <h2>{result.message}</h2>
          <h3>🎉 Fun Facts:</h3>
          {result.fact.map((fact, index) => (
            <p key={index}>{fact.replace(/, /g, "\n")}</p>
          ))}
          <button className="next-btn" onClick={fetchQuestion}>🔄 Next Question</button>
          <button className="play-again-btn" onClick={resetGame}>🔁 Play Again</button>
        </div>
      )}
    </div>
  );
};

export default Game;
