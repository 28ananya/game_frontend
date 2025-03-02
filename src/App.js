import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Game from "./components/Game";
import ChallengeFriend from "./components/ChallengeFriend";
import Register from "./components/Register";

function App() {
  const [username, setUsername] = useState(null); // Store registered username

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register onRegister={setUsername} />} /> {/* Pass onRegister */}
      <Route path="/game" element={<Game username={username} />} /> {/* Pass username */}
      <Route path="/challenge" element={<ChallengeFriend username={username} />} /> {/* Pass username */}
    </Routes>
  );
}

export default App;
