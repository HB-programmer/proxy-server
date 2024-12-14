const redis = require('redis');

const client = redis.createClient({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
});

let isClientReady = false;

// Event Handlers
client.on('connect', () => {
    console.log('Connected to Redis');
});

client.on('ready', () => {
    isClientReady = true;
    console.log('Redis client is ready');
});

client.on('error', (err) => {
    console.error('Redis error:', err);
});

client.on('end', () => {
    isClientReady = false;
    console.log('Redis connection closed');
});

// Ensure client connects at startup
(async () => {
    try {
        await client.connect();
    } catch (err) {
        console.error('Error connecting to Redis:', err);
    }
})();

const cacheResponse = async (key, value) => {
    if (!isClientReady) {
        console.error('Redis client is not ready. Cannot set cache.');
        return;
    }
    try {
        console.log('Setting cache for key:', key);
        
        // Ensure the value is a string
        const stringValue = typeof value === 'string' ? value : JSON.stringify(value);

        return await client.setEx(key, Number(process.env.REDIS_TTL), stringValue); // Set the cache with a valid TTL
    } catch (err) {
        console.error('Error setting cache:', err);
        return
    }
};

const getCachedResponse = async (key) => {
    if (!isClientReady) {
        console.error('Redis client is not ready. Cannot get cache.');
        return null;
    }
    try {
        console.log('Getting cache for key:', key);
        return await client.get(key);
    } catch (err) {
        console.error('Error getting cache:', err);
        return null;
    }
};

module.exports = { cacheResponse, getCachedResponse };
