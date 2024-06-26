import React, { useState, useEffect, useCallback, useRef } from 'react';
import Layout from '../../components/Layout';
import './StroopGame.css';
import axios from 'axios';

const colors = ["Red", "Green", "Blue", "Yellow"];
const colorValues = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00"];

const StroopGame = () => {
    const [word, setWord] = useState('');
    const [color, setColor] = useState('');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(20);
    const [gameState, setGameState] = useState('waiting'); // 'waiting', 'playing', 'finished'
    const intervalRef = useRef(null);
    const [message, setMessage] = useState('Click the correct color of the word');

    const saveScore = useCallback(async () => {
        const token = localStorage.getItem('authToken');
        const username = localStorage.getItem('username');
        
        try {
            await axios.post('http://localhost:8080/score/save', {
                username: username,
                score: score,
                gameId: 5,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Score saved successfully');
        } catch (error) {
            console.error('Error saving the score:', error);
        }
    }, [score]);

    useEffect(() => {
        if (gameState === 'playing') {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
            }, 1000);
        }

        return () => clearInterval(intervalRef.current);
    }, [gameState]);

    useEffect(() => {
        if (timeLeft === 0 && gameState === 'playing') {
            setGameState('finished');
            saveScore();
        }
    }, [timeLeft, gameState, saveScore]);

    const handleClick = (selectedColor) => {
        if (gameState !== 'playing') return;

        if (color === selectedColor) {
            setScore(score + 1);
            setMessage('Correct!');
        } else {
            setMessage('Wrong!');
        }
        generateNewWord();
    };

    const generateNewWord = () => {
        const randomWord = colors[Math.floor(Math.random() * colors.length)];
        const randomColor = colorValues[Math.floor(Math.random() * colorValues.length)];
        setWord(randomWord);
        setColor(randomColor);
    };

    const startGame = () => {
        setScore(0);
        setTimeLeft(20);
        generateNewWord();
        setGameState('playing');
    };

    return (
        <Layout>
            <div className="game-container">
                <div className="game-area">
                    <h2>Stroop Test Game</h2>
                    {gameState === 'waiting' && <button onClick={startGame}>Start Game</button>}
                    {gameState === 'playing' && (
                        <div>
                            <p style={{ color: color, fontSize: '2em' }}>{word}</p>
                            <div className="color-buttons">
                                {colorValues.map((colorValue, index) => (
                                    <button
                                        key={index}
                                        style={{ backgroundColor: colorValue }}
                                        onClick={() => handleClick(colorValue)}
                                        className="color-button"
                                    />
                                ))}
                            </div>
                            <p className="message">{message}</p>
                            <div className='time-left'>
                                <p>Time Left: {timeLeft}s</p>
                            </div>
                        </div>
                    )}
                    {gameState === 'finished' && (
                        <div>
                            <p className="score-display">Your Score: {score}</p>
                            <button onClick={startGame}>Play Again</button>
                        </div>
                    )}
                </div>
                <div className="lower-section">
                    <div className="left-section">
                        <p>How to play: 
                            <br />1. Look at the color of the word displayed.
                            <br />2. Click the button with the color that matches the color of the word, not the word itself.
                            <br />3. Your score will be updated based on your response.
                            <br />4. The game lasts for 20 seconds, try to get as many correct as possible.
                        </p>
                    </div>
                    <div className="right-section">
                        <p>About the test:
                            <br /> This test measures your ability to process conflicting information.
                            <br /> It helps in understanding cognitive flexibility and attention control.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default StroopGame;
