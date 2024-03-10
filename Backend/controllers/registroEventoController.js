const Event = require('../models/eventModel');
const Usuario = require('../models/usuarioModel');
const UserEvent = require('../models/UserEvent');

const registerUserToEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const { userId } = req.body;

        console.log('eventId:', eventId);
        console.log('userId:', userId);  

        const event = await Event.findByPk(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }

        const user = await Usuario.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const isRegistered = await UserEvent.findOne({
            where: { eventId, userId }
        });

        if (isRegistered) {
            return res.status(400).json({ message: 'El usuario ya está registrado en este evento' });
        }

        await UserEvent.create({ eventId, userId });

        res.status(200).json({ message: 'Usuario registrado en el evento exitosamente' });
    } catch (error) {
        console.error('Error al registrar usuario en evento:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

module.exports = { registerUserToEvent };
