
const jwt = require('jsonwebtoken');

const generateToken = (email) => {

    const secretKey = process.env.JWT_SECRET;

    const payload = { email };

    const options = { expiresIn: process.env.JWT_EXPIRES_IN };

    return jwt.sign(payload, secretKey, options);
};

module.exports = {
    generateToken,
};
