const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.get('/:eventId', eventController.getEventById);
// Define la ruta GET para obtener todos los eventos
router.get('/', eventController.getAllEvents);

module.exports = router;