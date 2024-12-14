const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    const secretKey = process.env.JWT_SECRET;

    // Verify the token
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        req.user = decoded;
        next();
    });
};

module.exports = {
    verifyToken,
};