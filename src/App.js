// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NumberMemoryGame from './pages/Games/NumberMemoryGame';
import ReactionTimeGame from './pages/Games/ReactionTimeGame';
import VerbalMemoryGame from './pages/Games/VerbalMemoryGame';
import HigherLowerGame from './pages/Games/HigherLowerGame';
import ArithmeticGame from './pages/Games/ArithmeticGame';
import StroopGame from './pages/Games/StroopGame';
import SimonSaysGame from './pages/Games/SimonSaysGame';
import Dashboard from './pages/Stats/Dashboard';
import ReactionTimeDB from './pages/Stats/ReactionTimeDB';
import NumberMemoryDB from './pages/Stats/NumberMemoryDB';
import VerbalMemoryDB from './pages/Stats/VerbalMemoryDB';
import HigherLowerDB from './pages/Stats/HigherLowerDB';
import ArithmeticDB from './pages/Stats/ArithmeticDB';
import StroopDB from './pages/Stats/StroopDB.js';
import SimonSaysDB from './pages/Stats/SimonSaysDB.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/game/reaction-time" element={<ReactionTimeGame />} />
        <Route path="/game/number-memory" element={<NumberMemoryGame />} />
        <Route path="/game/verbal-memory" element={<VerbalMemoryGame />} />
        <Route path="/game/higher-lower" element={<HigherLowerGame />} />
        <Route path="/game/arithmetic" element={<ArithmeticGame />} />
        <Route path="/game/stroop" element={<StroopGame />} />
        <Route path="/game/simon-says" element={<SimonSaysGame />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/stats/reaction-time" element={<ReactionTimeDB />} />
        <Route path="/stats/number-memory" element={<NumberMemoryDB />} />
        <Route path="/stats/verbal-memory" element={<VerbalMemoryDB />} />
        <Route path="/stats/higher-lower" element={<HigherLowerDB />} />
        <Route path="/stats/arithmetic" element={<ArithmeticDB />} />
        <Route path="/stats/stroop" element={<StroopDB />} />
        <Route path="/stats/simon-says" element={<SimonSaysDB />} />
      </Routes>
    </Router>
  );
}

export default App;
