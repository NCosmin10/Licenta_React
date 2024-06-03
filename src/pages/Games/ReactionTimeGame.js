import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import './ReactionTimeGame.css';

const ReactionTimeGame = () => {
    const [message, setMessage] = useState('Click to Start');
    const [gameState, setGameState] = useState('waiting'); // 'waiting', 'ready', 'clicked', 'tooSoon'
    const [reactionTimes, setReactionTimes] = useState([]);
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [timeoutId, setTimeoutId] = useState(null);

    const handleClick = () => {
        if (gameState === 'waiting') {
            setMessage('Get Ready...');
            setGameState('ready');
            const delay = Math.floor(Math.random() * 3000) + 2000; // Random delay between 2 to 5 seconds
            const id = setTimeout(() => {
                setMessage('Click Now!');
                setStartTime(Date.now());
                setGameState('clicked');
            }, delay);
            setTimeoutId(id);
        } else if (gameState === 'ready') {
            clearTimeout(timeoutId);
            setMessage('Too Soon! Click to try again.');
            setGameState('tooSoon');
        } else if (gameState === 'clicked') {
            setEndTime(Date.now());
            const reactionTime = Date.now() - startTime;
            setReactionTimes([...reactionTimes, reactionTime]);
            setMessage(`Reaction Time: ${reactionTime} ms`);
            setGameState('waiting');
        } else if (gameState === 'tooSoon') {
            setMessage('Get Ready...');
            setGameState('ready');
            const delay = Math.floor(Math.random() * 3000) + 2000; // Random delay between 2 to 5 seconds
            const id = setTimeout(() => {
                setMessage('Click Now!');
                setStartTime(Date.now());
                setGameState('clicked');
            }, delay);
            setTimeoutId(id);
        }
    };

    useEffect(() => {
        if (reactionTimes.length === 5) { // Changed to 5 attempts
            const averageTime = reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length;
            setMessage(`Average Reaction Time: ${averageTime.toFixed(2)} ms`);
            setReactionTimes([]); // Reset reaction times
        }
    }, [reactionTimes]);

    const getMessageClass = () => {
        if (message === 'Get Ready...') {
            return 'get-ready';
        } else if (message === 'Click Now!') {
            return 'click-now';
        } else if (message.startsWith('Reaction Time')) {
            return 'reaction-time';
        } else if (message.startsWith('Average Reaction Time')) {
            return 'average-time';
        } else if (message === 'Too Soon! Click to try again.') {
            return 'too-soon';
        } else {
            return 'click-to-start';
        }
    };

    return (
        <Layout>
            <div className="game-container">
                <div className="game-area" onClick={handleClick}>
                    <h2>Reaction Time Game</h2>
                    <p className={getMessageClass()}>{message}</p>
                </div>
                <div className="lower-section">
                    <div className="left-section">
                        <p>Try to click as fast as possible after the cue.</p>
                    </div>
                    <div className="right-section">
                        <p>Average Reaction Time will be calculated after 5 attempts.</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ReactionTimeGame;
