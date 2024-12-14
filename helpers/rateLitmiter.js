const rateLimit = require('express-rate-limit');

exports.rateLimiter = rateLimit({
    windowMs: process.env.WINDOW_SIZE, // 1 minute
    max: process.env.MAX_LIMIT, // Limit each IP to 5 requests per minute
    message: { error: 'Too many requests, please try again later.' },
    standardHeaders: true, 
    legacyHeaders: false, 
});