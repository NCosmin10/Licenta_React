import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(''); // Clear previous error messages

        try {
            const response = await axios.post('http://localhost:8080/login', {
                username,
                password,
            });

            if (response.status === 200) {
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('username', response.data.username);
                navigate('/game/reaction-time');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setError('Login failed. Please check your username and password.');
            } else {
                console.error('There was an error logging in!', error);
                setError('Login failed. Please try again later.');
            }
        }
    };
    
    useEffect(() => {
        document.body.classList.add('home-page-body');
        return () => {
            document.body.classList.remove('home-page-body');
        };
    }, []);

    return (
        <div className='login-page'>
            <div className="login-container">
                <h2>Login</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit">Login</button>
                </form>
                <p className="redirect-text">Don't have an account? <Link to="/register">Sign up here</Link></p>
                <p className="redirect-text"><Link to="/">Home</Link></p>
            </div>
        </div>
    );
}

export default LoginPage;
