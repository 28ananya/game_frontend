import React from "react";
import Confetti from "react-confetti";

const Result = ({ result, onNextQuestion }) => {
  return (
    <div className="result-box">
      {result.correct && <Confetti />} {/* Show confetti if correct */}
      <h2>{result.correct ? "🎉 Correct!" : "😢 Incorrect!"}</h2>
      <h3>🎉 Fun Fact: {result.fact}</h3>
      <button className="next-btn" onClick={onNextQuestion}>
        Next Question
      </button>
    </div>
  );
};

export default Result;
