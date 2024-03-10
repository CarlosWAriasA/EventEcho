const express = require('express');
const router = express.Router();
const { registerUserToEvent } = require('../controllers/registroEventoController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Ruta para que los usuarios finales se registren en un evento
router.post('/:eventId',  authenticateToken, registerUserToEvent);

module.exports = router;
