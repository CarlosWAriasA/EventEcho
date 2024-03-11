const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const { authenticateToken } = require("../middleware/authMiddleware");

router.get("/", authenticateToken, eventController.getAllEvents);
router.get("/user", authenticateToken, eventController.getAllEventsByUserId);
router.get("/:eventId", authenticateToken, eventController.getEventById);
// Define la ruta GET para obtener todos los eventos

// Rutas para Organizadores (Eventos)
router.post("/", authenticateToken, eventController.createEvent);
router.put("/:eventId", authenticateToken, eventController.updateEvent);
router.delete("/:eventId", authenticateToken, eventController.deleteEvent);

module.exports = router;
