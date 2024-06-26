import React, { useState, useEffect, useCallback, useRef } from 'react';
import Layout from '../../components/Layout';
import './StroopGame.css';
import { saveScoreReq } from '../../services/GameServices';

const colors = ["Red", "Green", "Blue", "Yellow"];
const colorValues = ["#FF0000", "#00FF00", "#0000FF", "#FFD700"]; // Updated yellow color

const StroopGame = () => {
    const [word, setWord] = useState('');
    const [wordColor, setWordColor] = useState('');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(20);
    const [gameState, setGameState] = useState('waiting');
    const intervalRef = useRef(null);
    const [message, setMessage] = useState('Click the color that matches the word');

    const saveScore = useCallback(async () => {
        const username = localStorage.getItem('username');
        
        try {
            await saveScoreReq(username, score, 5);
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

        if (word === colors[colorValues.indexOf(selectedColor)]) {
            setScore(score + 1);
            setMessage('Correct!');
        } else {
            setMessage('Wrong!');
            setTimeLeft(timeLeft - 1);
        }
        generateNewWord();
    };

    const generateNewWord = () => {
        const randomWord = colors[Math.floor(Math.random() * colors.length)];
        const randomColor = colorValues[Math.floor(Math.random() * colorValues.length)];
        setWord(randomWord);
        setWordColor(randomColor);
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
                            <p style={{ color: wordColor, fontSize: '2em' }}>{word}</p>
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
                            <br />1. Look at the word displayed.
                            <br />2. Click the button with the color that matches the word itself, not the color of the word.
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
