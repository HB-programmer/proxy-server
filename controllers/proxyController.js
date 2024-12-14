const axios = require('axios');

const getUsers = async (req, res, next) => {
    try {
        const response = await axios.get(process.env.API_URL);

        console.log('Response from API:', response.data, "\n\n");

        res.locals.data = response.data;

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUsers,
};