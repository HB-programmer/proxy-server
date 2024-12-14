const express = require('express');
const router = express.Router();

const proxyController = require("../controllers/proxyController");

const { getCacheMiddleware, setCacheMiddleware } = require('../middlewares/cacheMiddleware');

router.get("/users",getCacheMiddleware,proxyController.getUsers, setCacheMiddleware);

module.exports = router;