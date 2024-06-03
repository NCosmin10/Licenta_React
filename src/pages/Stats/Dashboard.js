import React from 'react';
import Layout from '../../components/Layout2';
import './Dashboard.css';

const Dashboard = () => {
    const games = [
        { name: 'Reaction Time', avgScore: 150, bestScore: 200, communityScore: 180 },
        { name: 'Number Memory', avgScore: 120, bestScore: 170, communityScore: 140 },
        // Add more games as needed
    ];

    return (
        <Layout>
            <div className="dashboard-container">
                <div className="top-container">
                    <h2>User Name</h2>
                    <div className="button-group">
                        <button className="action-button">Logout</button>
                        <button className="action-button">Another Button</button>
                        {/* Add more buttons as needed */}
                    </div>
                </div>
                <div className="stats-container">
                    {games.map((game, index) => (
                        <div key={index} className="stats-row">
                            <div className="stats-item">{game.name}</div>
                            <div className="stats-item">Avg Score: {game.avgScore}</div>
                            <div className="stats-item">Best Score: {game.bestScore}</div>
                            <div className="stats-item">Community Score: {game.communityScore}</div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;