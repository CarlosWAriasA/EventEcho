const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

// Ruta para obtener todos los usuarios
//router.get('/usuarios', userController.obtenerTodosUsuarios);

// Ruta para obtener un usuario por su ID
router.get('/usuarios/:id', authenticateToken, userController.obtenerUsuario);

// Ruta para editar un usuario existente
router.put('/usuarios/:id', authenticateToken, userController.editarUsuario);

// También puedes utilizar PATCH para actualizar parcialmente un usuario
router.patch('/usuarios/:id', authenticateToken, userController.editarUsuario);

module.exports = router;
