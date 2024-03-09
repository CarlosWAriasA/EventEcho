const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/:eventId', authenticateToken, eventController.getEventById);
// Define la ruta GET para obtener todos los eventos
router.get('/', authenticateToken, eventController.getAllEvents);

module.exports = router;