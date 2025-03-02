import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Register.css";

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username) {
      setError("Please enter a username.");
      return;
    }
    
    setLoading(true);
    setError(null);
  
    try {
      console.log("Sending data:", { username });
  
      const res = await axios.post("https://game-backend-2-5wlb.onrender.com/register", 
        { username }, 
        { headers: { "Content-Type": "application/json" } }
      );
  
      console.log("Response:", res.data); // Debugging
  
      // If successful, show success alert
      alert("🎉 Registration successful! Now challenge a friend.");
      onRegister(username);
      navigate("/challenge");
  
    } catch (err) {
      if (err.response) {
        // If API returns 400 (username taken), show the actual error message
        if (err.response.status === 400) {
          setError(err.response.data?.message || "Username already taken!");
        } else {
          setError("Registration failed. Please try again.");
        }
      } else {
        console.error("Error:", err);
        setError("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="register-container">
      <h2>🔑 Register to Play</h2>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleRegister} disabled={loading}>
        {loading ? "Registering..." : "🚀 Register"}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Register;
