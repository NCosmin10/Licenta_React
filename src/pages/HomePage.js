import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.add('home-page-body');
        return () => {
            document.body.classList.remove('home-page-body');
        };
    }, []);

    return (
        <div className='home-page'>
            <div className="home-container">
                <h1>Welcome to Cogni Games</h1>
                <hr />
                <p>
                    Here you can train your cognitive skills.<br />
                    Choose from a variety of games each one improving a different aspect of your cognitive abilities.<br />
                    You can also track your progress, see how you improve over time and see how you compare to others.<br />
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
