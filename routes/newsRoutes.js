const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { fetchNews } = require('../controllers/newsController');

router.get('/', authMiddleware, fetchNews);

module.exports = router;
