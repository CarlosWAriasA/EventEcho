const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");

// Ruta para obtener todos los usuarios
//router.get('/usuarios', userController.obtenerTodosUsuarios);

// Ruta para obtener un usuario por su ID
router.get("/usuarios/:id", authenticateToken, userController.obtenerUsuario);

// Ruta para editar un usuario y cargar una imagen de perfil
// router.put('/usuarios/:id', authenticateToken, userController.upload.single('profileImage'), userController.editarUsuario);

// También puedes utilizar PATCH para actualizar parcialmente un usuario
router.put(
  "/usuarios",
  authenticateToken,
  userController.upload.single("profileImage"),
  userController.editarUsuario
);

module.exports = router;
