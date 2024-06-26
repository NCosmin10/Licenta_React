import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../../components/Layout';
import './SimonSaysGame.css';
import axios from 'axios';

const colorValues = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00"];

const SimonSaysGame = () => {
    const [sequence, setSequence] = useState([]);
    const [userSequence, setUserSequence] = useState([]);
    const [score, setScore] = useState(0);
    const [gameState, setGameState] = useState('waiting'); // 'waiting', 'showing', 'playing', 'finished'
    const [message, setMessage] = useState('Click the start button to begin.');
    const [showingIndex, setShowingIndex] = useState(0);
    const [highlightedColor, setHighlightedColor] = useState('');

    useEffect(() => {
        if (gameState === 'showing' && showingIndex < sequence.length) {
            const showNextColor = () => {
                setHighlightedColor(sequence[showingIndex]);
                setTimeout(() => {
                    setHighlightedColor('');
                    setShowingIndex(prevIndex => prevIndex + 1);
                }, 500);
            };

            const timer = setTimeout(showNextColor, 1000);
            return () => clearTimeout(timer);
        } else if (gameState === 'showing' && showingIndex === sequence.length) {
            setMessage('Repeat the sequence.');
            setGameState('playing');
            setShowingIndex(0);
        }
    }, [gameState, showingIndex, sequence]);

    const startGame = () => {
        setSequence([]);
        setUserSequence([]);
        setScore(0);
        setMessage('Watch the sequence...');
        setGameState('showing');
        addColorToSequence([]);
    };

    const addColorToSequence = (currentSequence) => {
        const randomColor = colorValues[Math.floor(Math.random() * colorValues.length)];
        setSequence([...currentSequence, randomColor]);
        setShowingIndex(0);
    };

    const handleColorClick = (color) => {
        if (gameState !== 'playing') return;

        const newUserSequence = [...userSequence, color];
        setUserSequence(newUserSequence);

        if (sequence[newUserSequence.length - 1] !== color) {
            setGameState('finished');
            setMessage(`Game Over! Your score: ${score}`);
            saveScore();
        } else if (newUserSequence.length === sequence.length) {
            setScore(score + 1);
            setUserSequence([]);
            setMessage('Good job! Watch the next sequence...');
            setGameState('showing');
            setTimeout(() => addColorToSequence(sequence), 1000);
        }
    };

    const saveScore = useCallback(async () => {
        const token = localStorage.getItem('authToken');
        const username = localStorage.getItem('username');

        try {
            await axios.post('http://localhost:8080/score/save', {
                username: username,
                score: score,
                gameId: 6,
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

    return (
        <Layout>
            <div className="game-container">
                <div className="game-area">
                    <h2>Simon Says Game</h2>
                    {gameState === 'waiting' && <button onClick={startGame}>Start Game</button>}
                    {gameState !== 'waiting' && (
                        <div>
                            <p className="message">{message}</p>
                            <div className="color-buttons">
                                {colorValues.map((colorValue, index) => (
                                    <button
                                        key={index}
                                        style={{ 
                                            backgroundColor: colorValue,
                                            opacity: highlightedColor === colorValue ? 1 : 0.4,
                                            border: highlightedColor === colorValue ? '5px solid black' : 'none',
                                            transform: highlightedColor === colorValue ? 'scale(1.2)' : 'scale(1)'
                                        }}
                                        onClick={() => handleColorClick(colorValue)}
                                        className="color-button"
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    {gameState === 'finished' && <button onClick={startGame}>Play Again</button>}
                </div>
                <div className="lower-section">
                    <div className="left-section">
                        <p>How to play:
                            <br />1. Click the start button to begin.
                            <br />2. Watch the sequence of colors shown.
                            <br />3. Repeat the sequence by clicking the colors in the same order.
                            <br />4. The sequence will get longer each round. Try to remember as much as possible!
                        </p>
                    </div>
                    <div className="right-section">
                        <p>About the game:
                            <br />This game will test your memory and attention to detail.
                            <br /> It helps in improving working memory.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default SimonSaysGame;
