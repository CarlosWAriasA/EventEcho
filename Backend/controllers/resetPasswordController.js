const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const usuarioModel = require('../models/usuarioModel');
const authHelper = require('../util/authHelper');
const { enviarCorreo } = require('./correoControlador');

const resetPassword = async (req, res) => {
    const { newPassword } = req.body;

        // Extraer el token de la URL
        const URI = req.originalUrl;
        const token = URI.split('/').pop();
        console.log(token);

    try {
        // Verifica si el token es válido y obtiene el ID de usuario asociado
        const decoded = await authHelper.verificarToken(token);
        const userId = decoded.userId;

        // Busca al usuario en la base de datos
        const usuario = await usuarioModel.findByPk(userId);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Actualiza la contraseña del usuario
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        usuario.password = hashedPassword;
        await usuario.save();

        // Enviar un correo electrónico de confirmación
        const destinatario = usuario.email;
        const asunto = 'Contraseña restablecida';
        const plantillaNombre = 'contraseña_restablecida.html';
        const datos = {
            nombre: usuario.name
        };

        // Enviar el correo electrónico
        await enviarCorreo(destinatario, asunto, plantillaNombre, datos);

        res.status(200).json({ message: 'Contraseña restablecida con éxito' });
    } catch (error) {
        console.error('Error al restablecer la contraseña:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

module.exports = {
    resetPassword
};
