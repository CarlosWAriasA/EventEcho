const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/:userId', authenticateToken, profileController.getProfileById);

module.exports = router;
