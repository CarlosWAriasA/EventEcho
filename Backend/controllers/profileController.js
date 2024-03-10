const jwt = require('jsonwebtoken');
const Profile = require('../models/usuarioModel');

const getProfileById = async (req, res) => {
    try {
         // Extraer el ID del usuario del token JWT
        const userId = req.user.userId;
        const profile = await Profile.findByPk(userId);
        
        if (!profile) {
            return res.status(404).json({ message: 'Perfil no encontrado' });
        }
        
        res.status(200).json(profile);
    } catch (error) {
        console.error('Error al obtener el perfil:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

module.exports = { getProfileById };
