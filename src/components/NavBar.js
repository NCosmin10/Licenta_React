import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
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
                <li className="square-bullet"><Link to="/reaction-time-game">Reaction Time</Link></li>
                <li className="square-bullet"><Link to="/number-memory-game">Number Memory</Link></li>
                <li className="square-bullet"><Link to="/verbal-memory-game">Verbal Memory</Link></li>
                <li className="square-bullet"><Link to="/higher-lower-game">Higher or Lower</Link></li>
                <li className="square-bullet"><Link to="/arithmetic-game">Arithmetic</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;
