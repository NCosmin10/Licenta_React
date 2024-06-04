// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NumberMemoryGame from './pages/Games/NumberMemoryGame';
import ReactionTimeGame from './pages/Games/ReactionTimeGame';
import VerbalMemoryGame from './pages/Games/VerbalMemoryGame';
import Dashboard from './pages/Stats/Dashboard';
import ReactionTimeDB from './pages/Stats/ReactionTimeDB';
import NumberMemoryDB from './pages/Stats/NumberMemoryDB';
import VerbalMemoryDB from './pages/Stats/VerbalMemoryDB';

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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reaction-time-stats" element={<ReactionTimeDB />} />
        <Route path="/number-memory-stats" element={<NumberMemoryDB />} />
        <Route path="/verbal-memory-stats" element={<VerbalMemoryDB />} />
      </Routes>
    </Router>
  );
}

export default App;
