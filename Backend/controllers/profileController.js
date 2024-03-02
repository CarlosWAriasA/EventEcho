const Profile = require('../models/usuarioModel');

const getProfileById = async (req, res) => {
    try {
        const userId = req.params.userId;
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
