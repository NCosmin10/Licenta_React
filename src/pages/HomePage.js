import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className='home-page'>
        <div className="home-container">
            <h1>Welcome to Cogni Games</h1>
            <hr />
            <p>Here you can train your mind and reaction time.<br></br>
            Choose from a variety of games each one improving a different aspect of your cognitive abilities.<br></br>
            You can also track your progress and see how you improve over time. <br></br>
            See how you compare to others in the leaderboards.<br></br>
            Start training now!
            </p>
            <div className="button-container">
                <button onClick={() => navigate('/login')}>Login</button>
                <button onClick={() => navigate('/register')}>Register</button>
            </div>
        </div>
        </div>
    );
}

export default HomePage;
