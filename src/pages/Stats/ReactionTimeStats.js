import React from 'react';
import Layout from '../../components/Layout2';
import './StatsPage.css';

const ReactionTimeStats = () => {
    return (
        <Layout>
            <div className="user-stats-container">
                <div className="top-section">
                    <div className="left">
                        <h2>User Name</h2>
                        <div className='buttons'>
                            <button>Edit</button>
                            <button>Logout</button>
                        </div>
                    </div>
                    <div className="right">
                        <h2>Reaction Time</h2>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="middle-section">
                    <div className="stats">
                        <div className="stat-box">
                            <p>Best Score</p>
                            <h3>100</h3>
                        </div>
                        <div className="stat-box">
                            <p>Avg Score</p>
                            <h3>200</h3>
                        </div>
                        <div className="stat-box">
                            <p>Avg Comunity Score</p>
                            <h3>300</h3>
                        </div>
                    </div>
                    <div className="buttons">
                        <button>Button 1</button>
                        <button>Button 2</button>
                    </div>
                    <div className="game-history">
                        <h3>Game History</h3>
                        <ul>
                            <li>Game 1 - Win asasasasaasaasasasas</li>
                            <li>Game 2 - Lose</li>
                            <li>Game 3 - Win</li>
                            <li>Game 4 - Lose</li>
                            {/* Add more list items as needed */}
                        </ul>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="bottom-section">
                    <p>Placeholder text for the fourth section</p>
                </div>
            </div>
        </Layout>
    );
}

export default ReactionTimeStats;
