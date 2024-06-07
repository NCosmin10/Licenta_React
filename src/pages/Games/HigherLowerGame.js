import React, { useState, useEffect, useCallback, useRef } from 'react';
import Layout from '../../components/Layout';
import './HigherLowerGame.css';
import axios from 'axios';

const HigherLowerGame = () => {
    const [currentNumber, setCurrentNumber] = useState(Math.floor(Math.random() * 100));
    const [nextNumber, setNextNumber] = useState(Math.floor(Math.random() * 100));
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(20);
    const [gameState, setGameState] = useState('waiting'); // 'waiting', 'playing', 'finished'
    const intervalRef = useRef(null);

    const saveScore = useCallback(async () => {
        const token = localStorage.getItem('authToken');
        const username = localStorage.getItem('username');
        
        try {
            await axios.post('http://localhost:8080/scoreSave', {
                username: username,
                score: score,
                gameId: 3,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            alert('Score saved successfully');
        } catch (error) {
            console.error('Error saving the score:', error);
            alert('Failed to save score');
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

    const handleComparison = (comparison) => {
        if (gameState !== 'playing') return;

        const correct =
            (comparison === 'higher' && nextNumber > currentNumber) ||
            (comparison === 'lower' && nextNumber < currentNumber) ||
            (comparison === 'equal' && nextNumber === currentNumber);

        if (correct) {
            setScore(score + 1);
        }

        setCurrentNumber(nextNumber);
        setNextNumber(Math.floor(Math.random() * 100));
    };

    const startGame = () => {
        setScore(0);
        setTimeLeft(20);
        setCurrentNumber(Math.floor(Math.random() * 100));
        setNextNumber(Math.floor(Math.random() * 100));
        setGameState('playing');
    };

    return (
        <Layout>
            <div className="game-container">
                <div className="game-area">
                    <h2>Higher or Lower</h2>
                    {gameState === 'waiting' && <button onClick={startGame}>Start Game</button>}
                    {gameState === 'playing' && (
                        <div>
                            <p className="number-display">{currentNumber}</p>
                            <p className="number-display">{nextNumber} is:</p>
                            <div className="buttons">
                                <button onClick={() => handleComparison('higher')}>Higher</button>
                                <button onClick={() => handleComparison('lower')}>Lower</button>
                                <button onClick={() => handleComparison('equal')}>Equal</button>
                            </div>
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
                        <p>Compare the numbers and guess if the next number is higher, lower, or equal.</p>
                    </div>
                    <div className="right-section">
                        <p>Your score will be based on the number of correct guesses within 20 seconds.</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default HigherLowerGame;
