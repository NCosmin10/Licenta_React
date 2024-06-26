import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import { fetchUserScores } from '../../services/StatsService';

const Dashboard = () => {
    const [games, setGames] = useState([]);
    const token = localStorage.getItem('authToken');
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    const gameUnits = {
        "Reaction_Time": "ms",
        "Number_Memory": "digits",
        "Higher_Lower": "points",
        "Arithmetic": "points",
        "Stroop": "points",
        "Simon_Says": "points",
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchUserScores(username, token);
                if (response.status === 200) {
                    const data = response.data;
                    setGames(data);
                } else {
                    console.error('Failed to fetch scores:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching scores:', error);
            }
        };

        fetchData();
    }, [token, username]);

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
                            <div className="stats-item">{game.gameName.replace(/_/g, ' ')}</div>
                            <div className="stats-item">{`${game.personalAvgScore} ${gameUnits[game.gameName] || ''}`}</div>
                            <div className="stats-item">{`${game.personalBestScore} ${gameUnits[game.gameName] || ''}`}</div>
                            <div className="stats-item">{`${game.communityAvgScore} ${gameUnits[game.gameName] || ''}`}</div>
                            <div className="stats-item"><Link to={`/game/${game.gameName.toLowerCase().replace(/\s+/g, '-').replace(/_/g, '-')}`}>Play</Link></div>
                            <div className="stats-item"><Link to={`/stats/${game.gameName.toLowerCase().replace(/\s+/g, '-').replace(/_/g, '-')}`}>Stats</Link></div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;
