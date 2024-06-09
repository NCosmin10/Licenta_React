import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout2';
import './GamesDB.css';
import axios from 'axios';

const ReactionTimeDB = () => {
    const [gameStats, setGameStats] = useState(null);
    const token = localStorage.getItem('authToken');
    const username = localStorage.getItem('username');
    const navigate = useNavigate();
    const gameId = 1;

    useEffect(() => {
        // Function to fetch data from the backend
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/score/${username}/${gameId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    const data = response.data;
                    console.log(data);
                    setGameStats(data);
                } else {
                    console.error('Failed to fetch scores:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching scores:', error);
            }
        };

        fetchData();
    }, [token, username, gameId]);

    if (!gameStats) {
        return <div>Loading...</div>;
    }

    const { gameName, personalAvgScore, personalBestScore, communityAvgScore, gameDates, gameScores } = gameStats;

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        navigate('/');
    };

    return (
        <Layout>
            <div className='gamesDB'>
                <div className="reaction-time-dashboard-container">
                    <div className="top-container">
                        <h2>{username}</h2>
                        <h3>{gameName.replace(/_/g, ' ')}</h3>
                        <div className="button-group">
                            <button className="action-button" onClick={handleLogout}>Logout</button>
                            <button className="action-button" onClick={() => navigate('/dashboard')}>Dashboard</button>
                        </div>
                    </div>
                    <div className="stats-container">
                        <div className="stats-item">Avg Score: {personalAvgScore} ms</div>
                        <div className="stats-item">Best Score: {personalBestScore} ms</div>
                        <div className="stats-item">Community Score: {communityAvgScore} ms</div>
                    </div>
                    <div className="history-container">
                        <h3>Game History</h3>
                        {gameDates.map((date, index) => (
                            <div key={index} className="history-row">
                                <div className="history-item">{new Date(date).toLocaleDateString()}</div>
                                <div className="history-item">{new Date(date).toLocaleTimeString()}</div>
                                <div className="history-item">{gameScores[index]} ms</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ReactionTimeDB;
