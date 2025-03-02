import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../Home.css";

const Home = () => {
  const [hoursPlayed, setHoursPlayed] = useState(0);

  useEffect(() => {
    // Simulating hours played (You can store this in MongoDB later)
    setHoursPlayed(Math.floor(Math.random() * 10) + 1);
  }, []);

  return (
    <div className="home-container">
      <h1>🌍 Welcome to The Globetrotter Challenge!</h1>
      <h2>⏳ Hours Played: {hoursPlayed} hours</h2>

      <div className="buttons">
        <Link to="/game">
          <button className="play-btn">🎮 Start Playing</button>
        </Link>

        <Link to="/challenge">
          <button className="challenge-btn">📣 Challenge a Friend</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
