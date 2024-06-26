import axios from 'axios';

const fetchUserScores = async (username, token) => {
    try {
        const response = await axios.get(`http://localhost:8080/score/${username}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};

const fetchGameStats = async (username, gameId, token) => {
    try {
        const response = await axios.get(`http://localhost:8080/score/${username}/${gameId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export { fetchUserScores, fetchGameStats };