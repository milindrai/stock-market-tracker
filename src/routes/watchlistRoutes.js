const express = require('express');
const router = express.Router();
const watchlistController = require('../controllers/watchlistController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/add', authMiddleware, watchlistController.addToWatchlist);

module.exports = router;
