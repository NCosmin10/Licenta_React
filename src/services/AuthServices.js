import axios from 'axios';

const login = async (username, password) => {
    try {
        const response = await axios.post('http://localhost:8080/login', { username, password });
        return response;
    } catch (error) {
        throw error;
    }
};

const register = async (username, email, password) => {
    try {
        const response = await axios.post('http://localhost:8080/auth/register', { username, email, password });
        return response;
    } catch (error) {
        throw error;
    }
};

export { login, register };
