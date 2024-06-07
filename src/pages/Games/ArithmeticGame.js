import React, { useState, useEffect, useCallback, useRef } from 'react';
import Layout from '../../components/Layout';
import './ArithmeticGame.css';
import axios from 'axios';

const ArithmeticGame = () => {
    const [equation, setEquation] = useState(generateEquation());
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
                gameId: 4,
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

    const handleOperatorClick = (operator) => {
        if (gameState !== 'playing') return;

        const correct = checkAnswer(equation, operator);

        if (correct) {
            setScore(score + 1);
        }

        setEquation(generateEquation());
    };

    const startGame = () => {
        setScore(0);
        setTimeLeft(20);
        setEquation(generateEquation());
        setGameState('playing');
    };

    return (
        <Layout>
            <div className="game-container">
                <div className="game-area">
                    <h2>Arithmetic Game</h2>
                    {gameState === 'waiting' && <button onClick={startGame}>Start Game</button>}
                    {gameState === 'playing' && (
                        <div>
                            <p className="equation-display">{equation.question}</p>
                            <div className="buttons">
                                <button onClick={() => handleOperatorClick('+')}>+</button>
                                <button onClick={() => handleOperatorClick('-')}>-</button>
                                <button onClick={() => handleOperatorClick('*')}>*</button>
                                <button onClick={() => handleOperatorClick('/')}>/</button>
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
                        <p>Select the correct operator to complete the equation.</p>
                    </div>
                    <div className="right-section">
                        <p>Your score will be based on the number of correct answers within 20 seconds.</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

const generateEquation = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ['+', '-', '*', '/'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    let answer;

    switch (operator) {
        case '+':
            answer = num1 + num2;
            break;
        case '-':
            answer = num1 - num2;
            break;
        case '*':
            answer = num1 * num2;
            break;
        case '/':
            answer = (num1 / num2).toFixed(1);
            break;
        default:
            break;
    }

    return {
        question: `${num1} ? ${num2} = ${answer}`,
        correctOperator: operator
    };
};

const checkAnswer = (equation, operator) => {
    return equation.correctOperator === operator;
};

export default ArithmeticGame;
