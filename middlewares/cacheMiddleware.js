const { getCachedResponse, cacheResponse } = require('../helpers/cache');

const getCacheMiddleware = async (req, res, next) => {
    const apiUrl = req.originalUrl;  // Use the full URL as the key for caching
    try {
        const cachedResponse = await getCachedResponse(apiUrl);

        if (cachedResponse) {
            return res.status(200).json(JSON.parse(cachedResponse)); // Return cached response if found
        }
        next(); // If not found in cache, proceed to the controller
    } catch (err) {
        next(err); // If error in cache, proceed to controller as well
    }
};


const setCacheMiddleware = async (req, res, next) => {
    const apiUrl = req.originalUrl;  // Use the full URL as the key for caching
    try{
        console.log('Response from API in cache middleware:', res.locals.data, "\n\n");
        
        const cachedResponse = await cacheResponse(apiUrl, res.locals.data);

        console.log('Cached response:', cachedResponse);

        if(cachedResponse){
            return res.status(200).json(res.locals.data);
        }


        return res.status(200).json(res.locals.data);
    }
    catch(err){
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    getCacheMiddleware,
    setCacheMiddleware,
};
