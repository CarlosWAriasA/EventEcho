const express = require('express');
const router = express.Router();
const { registerUserToEvent } = require('../controllers/registroEventoController');
const { authenticateToken } = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

// Ruta para que los usuarios finales se registren en un evento
router.post('/:eventId',  authenticateToken, registerUserToEvent);

// Ruta para obtener todos los usuarios
//router.get('/usuarios', userController.obtenerTodosUsuarios);

// Ruta para obtener un usuario por su ID
router.get('/usuarios/:id', userController.obtenerUsuario);

// Ruta para editar un usuario existente
router.put('/usuarios/:id', userController.editarUsuario);

// También puedes utilizar PATCH para actualizar parcialmente un usuario
router.patch('/usuarios/:id', userController.editarUsuario);

module.exports = router;
