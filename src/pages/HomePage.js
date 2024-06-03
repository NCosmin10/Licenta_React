import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className='home-page'>
        <div className="home-container">
            <h1>Welcome to Cognitive Games</h1>
            <hr />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla varius ornare luctus. Nulla et sapien dictum, euismod 
                risus ac, fringilla urna. Curabitur lacus erat, molestie sit amet turpis sed, volutpat suscipit ipsum. Morbi 
                accumsan diam ut sodales lacinia. Aliquam interdum, ligula non accumsan bibendum, odio risus fringilla mi, 
                et efficitur sapien erat sit amet nibh. Sed et turpis diam. Sed faucibus odio lorem, consectetur ultricies 
                dolor consequat pellentesque. Sed auctor sollicitudin tortor quis vehicula.</p>
            <div className="button-container">
                <button onClick={() => navigate('/login')}>Login</button>
                <button onClick={() => navigate('/register')}>Register</button>
            </div>
        </div>
        </div>
    );
}

export default HomePage;
