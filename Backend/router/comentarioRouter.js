const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authMiddleware");
const comentarioController = require("../controllers/comentarioController");

router.get("/", authenticateToken, comentarioController.getComentarios);

router.post("/", authenticateToken, comentarioController.addComentario);

module.exports = router;
