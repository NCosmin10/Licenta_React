import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== repeatPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/auth/register', {
                username,
                email,
                password,
            });
            if (response.data === 'Registration successful') {
                alert('Registration successful');
                navigate('/login'); // Redirect to the login page
            } else {
                alert(response.data);
            }
        } catch (error) {
            console.error('There was an error registering!', error);
            alert('Registration failed');
        }
    };

    return (
        <div className='register-page'>
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Repeat Password</label>
                    <input type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} required />
                </div>
                <button type="submit">Register</button>
            </form>
            <p className="redirect-text">Already have an account? <Link to="/login">Login here</Link></p>
            <p className="redirect-text"><Link to="/">Home</Link></p>
        </div>
        </div>
    );
}

export default RegisterPage;
