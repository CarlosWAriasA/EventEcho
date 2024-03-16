const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const userEventController = require("../controllers/userEventController");
const { authenticateToken } = require("../middleware/authMiddleware");

// Rutas para registrar usuarios a eventos y eliminarlos
router.get(
  "/events-user/:eventId",
  authenticateToken,
  userEventController.getUserIsRegister
);

router.get(
  "/events-user",
  authenticateToken,
  userEventController.getUserEvents
);

router.post(
  "/register-user",
  authenticateToken,
  userEventController.addUserEvent
);

router.delete(
  "/delete-user",
  authenticateToken,
  userEventController.deleteUserEvent
);

// Rutas para Organizadores (Eventos)
router.post("/", authenticateToken,  eventController.upload.array('images', 4), eventController.createEvent);
router.put("/:eventId", authenticateToken, eventController.updateEvent);
router.delete("/:eventId", authenticateToken, eventController.deleteEvent);

// Define la ruta GET para obtener todos los eventos
router.get("/", authenticateToken, eventController.getAllEvents);
router.get("/user", authenticateToken, eventController.getAllEventsByUserId);
router.get("/:eventId", authenticateToken, eventController.getEventById);

module.exports = router;
