const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Ruta para obtener todos los eventos del usuario actual
router.get('/user/events', authenticateToken, eventController.getAllEventsByUserId);

module.exports = router;
