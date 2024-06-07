import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import './NumberMemoryGame.css';
import axios from 'axios';

const NumberMemoryGame = () => {
    const [numberToShow, setNumberToShow] = useState('');
    const [generatedNumber, setGeneratedNumber] = useState('');
    const [userInput, setUserInput] = useState('');
    const [gameState, setGameState] = useState('waiting'); // 'waiting', 'showing', 'input', 'finished'
    const [digits, setDigits] = useState(1);
    const [score, setScore] = useState(0);
    const [countdown, setCountdown] = useState(0);

    // Save the average time to the backend
    const saveScore = async () => {
        const token = localStorage.getItem('authToken');
        const username = localStorage.getItem('username');

        try {
            await axios.post('http://localhost:8080/scoreSave', {
                username: username,
                score: score,
                gameId: 2,
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
    };

    useEffect(() => {
        if (gameState === 'showing') {
            const randomNumber = generateRandomNumber(digits);
            setNumberToShow(randomNumber);
            setGeneratedNumber(randomNumber);
            setCountdown(digits);
            const intervalId = setInterval(() => {
                setCountdown((prevCountdown) => {
                    if (prevCountdown <= 1) {
                        clearInterval(intervalId);
                        setGameState('input');
                        setNumberToShow('');
                        return 0;
                    }
                    return prevCountdown - 1;
                });
            }, 1000);
        }
    }, [gameState, digits]);

    const generateRandomNumber = (length) => {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += Math.floor(Math.random() * 10).toString();
        }
        return result;
    };

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleSubmit = () => {
        if (userInput === generatedNumber) {
            setScore(score + 1);
            setDigits(digits + 1);
            setUserInput('');
            setGameState('showing');
        } else {
            saveScore();
            setGameState('finished');
        }
    };

    const startGame = () => {
        setScore(0);
        setDigits(1);
        setUserInput('');
        setNumberToShow('');
        setGeneratedNumber('');
        setGameState('showing');
    };

    return (
        <Layout>
            <div className="game-container">
                <div className="game-area">
                    <h2>Number Memory</h2>
                    {gameState === 'waiting' && <button onClick={startGame}>Start Game</button>}
                    {gameState === 'showing' && (
                        <div>
                            <p className="number-display">{numberToShow}</p>
                            <div className="countdown-bar">
                                <div
                                    className="countdown-bar-fill"
                                    style={{ width: `${(countdown / digits) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    )}
                    {gameState === 'input' && (
                        <div>
                            <input
                                type="text"
                                value={userInput}
                                onChange={handleInputChange}
                                autoFocus
                                className="input-box"
                            />
                            <div  className='submit-button'>
                            <button onClick={handleSubmit}>Submit</button>
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
                        <p>Try to remember the number shown on the screen.</p>
                    </div>
                    <div className="right-section">
                        <p>The number will disappear after a few seconds, and you will have to type it.</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default NumberMemoryGame;
