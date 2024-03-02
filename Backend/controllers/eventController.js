const Event = require('../models/eventModel');

const getEventById = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const event = await Event.findByPk(eventId);
        
        if (!event) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        
        res.status(200).json(event);
    } catch (error) {
        // Maneja los errores de forma adecuada
        console.error('Error al obtener el evento:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

const getAllEvents = async (req, res) => {
    try {
        const events = await Event.findAll();
        res.status(200).json(events);
    } catch (error) {
        console.error('Error al obtener todos los eventos:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

module.exports = { getEventById, getAllEvents };