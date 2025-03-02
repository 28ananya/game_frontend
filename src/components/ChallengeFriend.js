import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../ChallengeFriend.css";

const ChallengeFriend = ({ username }) => {
  const [userScore, setUserScore] = useState(null);
  const navigate = useNavigate();

  // Redirect to Register page if username is not provided
  useEffect(() => {
    if (!username) {
      navigate("/register");
    }
  }, [username, navigate]);

  // Fetch user score when the component loads
  useEffect(() => {
    if (username) {
      axios.get(`https://game-backend-2-5wlb.onrender.com/score/${username}`)
        .then((res) => setUserScore(res.data.score))
        .catch((err) => console.error("Error fetching score:", err));
    }
  }, [username]);

  const shareOnWhatsApp = () => {
    if (!username) {
      alert("Please register before sharing!");
      return;
    }

    const shareUrl = `https://game-backend-2-5wlb.onrender.com/invite?user=${username}`;
    const message = `🌍 I challenge you to beat my score (${userScore}) in The Globetrotter Challenge! 🏆 Play here: ${shareUrl}`;

    const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="challenge-container">
      <h2>📣 Challenge a Friend</h2>
      <button onClick={shareOnWhatsApp}>📲 Share via WhatsApp</button>
      {userScore !== null && <p>Your Score: {userScore} 🏆</p>}
    </div>
  );
};

export default ChallengeFriend;
