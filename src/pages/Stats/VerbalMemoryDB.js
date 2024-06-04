import React from 'react';
import Layout from '../../components/Layout2';
import './GamesDB.css';

const VerbalMemoryDB = () => {
    const gameHistory = [
        { date: '2024-06-01', time: '12:00', score: 150 },
        { date: '2024-06-02', time: '13:00', score: 140 },
        { date: '2024-06-03', time: '14:00', score: 160 },
        // Add more history entries as needed
    ];

    return (
        <Layout>
            <div className='gamesDB'>
            <div className="reaction-time-dashboard-container">
                <div className="top-container">
                    <h2>User Name</h2>
                    <h3>Verbal Memory</h3>
                    <div className="button-group">
                        <button className="action-button">Logout</button>
                        <button className="action-button">Another Button</button>
                    </div>
                </div>
                <div className="stats-container">
                    <div className="stats-item">Avg Score: 150</div>
                    <div className="stats-item">Best Score: 200</div>
                    <div className="stats-item">Community Score: 180</div>
                </div>
                <div className="history-container">
                    <h3>Game History</h3>
                    {gameHistory.map((entry, index) => (
                        <div key={index} className="history-row">
                            <div className="history-item">{entry.date}</div>
                            <div className="history-item">{entry.time}</div>
                            <div className="history-item">{entry.score}</div>
                        </div>
                    ))}
                </div>
            </div>
            </div>
        </Layout>
    );
}

export default VerbalMemoryDB;
