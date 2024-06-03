import React from 'react';
import Layout from '../../components/Layout';
import './GamePage.css';

const VerbalMemoryGame = () => {
    return (
        <Layout>
            <div className="game-container">
                <div className="game-area">
                    <h2>Verbal Memory</h2>
                </div>
                <div className="lower-section">
                    <div className="left-section">
                        <p>Placeholder text for the left section</p>
                    </div>
                    <div className="right-section">
                        <p>Placeholder text for the right section</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default VerbalMemoryGame;
