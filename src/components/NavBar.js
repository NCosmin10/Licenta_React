import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="logo">COGNI GAMES</div>
            <div className="divider"></div>
            <ul className="top-buttons">
                <li className="circle-bullet"><Link to="/dashboard">Dashboard</Link></li>
            </ul>
            <div className="divider"></div>
            <ul className="game-links">
                <li className="square-bullet"><Link to="/game/reaction-time">Reaction Time</Link></li>
                <li className="square-bullet"><Link to="/game/number-memory">Number Memory</Link></li>
                <li className="square-bullet"><Link to="/game/higher-lower">Higher or Lower</Link></li>
                <li className="square-bullet"><Link to="/game/arithmetic">Arithmetic</Link></li>
                <li className="square-bullet"><Link to="/game/stroop">Stroop Test</Link></li>    
                <li className="square-bullet"><Link to="/game/simon-says">Simon Says</Link></li>            
            </ul>
        </nav>
    );
}

export default NavBar;
