import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout2';
import './Dashboard.css';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const token = localStorage.getItem('authToken');
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    const games = [
        { name: 'Reaction Time', avgScore: 150, bestScore: 200, communityScore: 180, linkGame:'/reaction-time-game', linkStats:'/reaction-time-stats'},
        { name: 'Number Memory', avgScore: 120, bestScore: 170, communityScore: 140, linkGame:'/number-memory-game', linkStats:'/number-memory-stats'},
        { name: 'Verbal Memory', avgScore: 120, bestScore: 170, communityScore: 140, linkGame:'/verbal-memory-game', linkStats:'/verbal-memory-stats'},
    ];

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        navigate('/');
    };

    return (
        <Layout>
            <div className="dashboard-container">
                <div className="top-container">
                    <h2>{username}</h2>
                    <div className="button-group">
                        <button className="action-button" onClick={handleLogout}>Logout</button>
                        {/* Add more buttons as needed */}
                    </div>
                </div>
                <div className="stats-container">
                    <div className='stats-row'>
                        <div className="stats-item">Game</div>
                        <div className="stats-item">Personal Average Score</div>
                        <div className="stats-item">Personal Best Score</div>
                        <div className="stats-item">Community Average Score</div>
                        <div className="stats-item">Play Game</div>
                        <div className="stats-item">See Statistics</div>
                    </div>
                    {games.map((game, index) => (
                        <div key={index} className="stats-row">
                            <div className="stats-item">{game.name}</div>
                            <div className="stats-item">{game.avgScore}</div>
                            <div className="stats-item">{game.bestScore}</div>
                            <div className="stats-item">{game.communityScore}</div>
                            <div className="stats-item"><Link to={game.linkGame}>Play</Link></div>
                            <div className="stats-item"><Link to={game.linkStats}>Stats</Link></div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;
