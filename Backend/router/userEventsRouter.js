const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const eventController = require('../controllers/eventController');

// Ruta para obtener todos los eventos del usuario actual
router.get('/user/events', authenticateToken, eventController.getAllEventsByUserId);

// Ruta para obtener todas las informaciones de los eventos del usuario organizador
router.get('/user/events-info', authenticateToken, eventController.getAllEventsByOrganizerId);

module.exports = router;
