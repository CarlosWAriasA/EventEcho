const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/', authenticateToken, profileController.getProfileById);

// Ruta para obtener un usuario por su ID
router.put('/', authenticateToken, userController.upload.single('profileImage'), userController.editarUsuario);


module.exports = router;
