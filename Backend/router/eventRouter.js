const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/:eventId', authenticateToken, eventController.getEventById);
// Define la ruta GET para obtener todos los eventos
router.get('/', authenticateToken, eventController.getAllEvents);


// Rutas para Organizadores (Eventos)
router.post('/', authenticateToken, eventController.createEvent);
router.put('/:eventId', authenticateToken, eventController.updateEvent);
router.delete('/:eventId', authenticateToken, eventController.deleteEvent);

module.exports = router;