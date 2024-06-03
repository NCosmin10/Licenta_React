import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/login', {
                username,
                password,
            });
            if (response.status === 200) {
                alert('Login successful');
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('username', response.data.username);
                navigate('/games');
            }
        } catch (error) {
            console.error('There was an error logging in!', error);
            alert('Login failed');
        }
    };

    return (
        <div className='login-page'>
        <div className="login-container">
            <h2>Login</h2>
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
