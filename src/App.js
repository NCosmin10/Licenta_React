// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NumberMemoryGame from './pages/Games/NumberMemoryGame';
import ReactionTimeGame from './pages/Games/ReactionTimeGame';
import VerbalMemoryGame from './pages/Games/VerbalMemoryGame';
import ReactionTimeStats from './pages/Stats/ReactionTimeStats';
import Dashboard from './pages/Stats/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reaction-time-game" element={<ReactionTimeGame />} />
        <Route path="/number-memory-game" element={<NumberMemoryGame />} />
        <Route path="/verbal-memory-game" element={<VerbalMemoryGame />} />
        <Route path="/reaction-time-stats" element={<ReactionTimeStats />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
