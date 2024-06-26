import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(''); // Clear previous error messages

        if (password !== repeatPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/auth/register', {
                username,
                email,
                password,
            });
            if (response.data === 'Registration successful') {
                navigate('/login'); // Redirect to the login page
            } else {
                setError(response.data);
            }
        } catch (error) {
            console.error('There was an error registering!', error);
            setError('Registration failed. Please try again later.');
        }
    };

    useEffect(() => {
        document.body.classList.add('home-page-body');
        return () => {
            document.body.classList.remove('home-page-body');
        };
    }, []);

    return (
        <div className='register-page'>
            <div className="register-container">
                <h2>Register</h2>
                {error && <div className="error-message">{error}</div>}
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
