import axios from 'axios';

const saveScoreReq = async (username, score, gameId) => {
    const token = localStorage.getItem('authToken');

    try {
        const response = await axios.post('http://localhost:8080/score/save', {
            username,
            score,
            gameId,
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export { saveScoreReq };
