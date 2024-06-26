import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import './ReactionTimeGame.css';
import { saveScoreReq } from '../../services/GameServices';

const ReactionTimeGame = () => {
    const [message, setMessage] = useState('Click to Start');
    const [gameState, setGameState] = useState('waiting');
    const [reactionTimes, setReactionTimes] = useState([]);
    const [startTime, setStartTime] = useState(0);
    const [timeoutId, setTimeoutId] = useState(null);

    const handleClick = () => {
        if (gameState === 'waiting') {
            setMessage('Get Ready...');
            setGameState('ready');
            const delay = Math.floor(Math.random() * 3000) + 2000;
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
            const reactionTime = Date.now() - startTime;
            setReactionTimes([...reactionTimes, reactionTime]);
            setMessage(`Reaction Time: ${reactionTime} ms`);
            setGameState('waiting');
        } else if (gameState === 'tooSoon') {
            setMessage('Get Ready...');
            setGameState('ready');
            const delay = Math.floor(Math.random() * 3000) + 2000;
            const id = setTimeout(() => {
                setMessage('Click Now!');
                setStartTime(Date.now());
                setGameState('clicked');
            }, delay);
            setTimeoutId(id);
        }
    };

    useEffect(() => {
        if (reactionTimes.length === 5) {
            const averageTime = reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length;
            setMessage(`Average Reaction Time: ${averageTime.toFixed(2)} ms`);
            setReactionTimes([]);

            const saveScore = async () => {
                const username = localStorage.getItem('username');

                try {
                    await saveScoreReq(username, averageTime, 1);
                    console.log('Score saved successfully');
                } catch (error) {
                    console.error('Error saving the score:', error);
                }
            };

            saveScore();
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
                        <p>How to play: 
                            <br />1. Click the box to start the game.
                            <br />2. Wait for the message "Click Now!".
                            <br />3. Click the box as soon as you see the message.
                            <br />4. Your reaction time will be displayed.
                            <br />5. Repeat the steps 5 times to get the average reaction time.
                        </p>
                    </div>
                    <div className="right-section">
                        <p>About the test:
                            <br /> In addition to measuring your reaction time, this test is affected by the latency of your computer
                             and monitor. Using a fast computer and low latency / high framerate monitor will improve your score.
                             
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ReactionTimeGame;
