const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authMiddleware");
const notificacionController = require("../controllers/notificacionController");

router.get("/", authenticateToken, notificacionController.getNotificaciones);

router.post("/", authenticateToken, notificacionController.addNotificacion);

router.put("/", authenticateToken, notificacionController.updateNotificacion);

module.exports = router;
