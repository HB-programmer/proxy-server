const express = require('express');
const morgan = require('morgan');
const { rateLimiter } = require('./helpers/rateLitmiter');
const intiRoutes = require('./routes/initRoutes');
const app = express();
require('dotenv').config();

// Middleware
app.use(morgan('combined')); // Logging
app.use(express.json());
app.use(rateLimiter); // Apply rate limiter middleware

// Routes
intiRoutes(app);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});