import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar2 = () => {
    return (
        <nav className="navbar">
            <div className="logo">COGNI GAMES</div>
            <div className="divider"></div>
            <ul className="top-buttons">
                <li className="circle-bullet"><Link to="/reaction-time-game">Games</Link></li>
                <li className="circle-bullet"><Link to="/dashboard">Dashboard</Link></li>
            </ul>
            <div className="divider"></div>
            <ul className="game-links">
                <li className="square-bullet"><Link to="/reaction-time-stats">Reaction Time</Link></li>
                <li className="square-bullet"><Link to="/number-memory-stats">Number Memory</Link></li>
                <li className="square-bullet"><Link to="/verbal-memory-stats">Verbal Memory</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar2;
