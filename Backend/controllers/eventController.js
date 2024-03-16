const jwt = require("jsonwebtoken");
const multer = require('multer');
const path = require('path');
const Event = require("../models/eventModel");
const Usuario = require("../models/usuarioModel");
const UserEvent = require("../models/UserEvent");
const { where } = require("sequelize");

// Obtener un evento por su ID
const getEventById = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const event = await Event.findByPk(eventId);

    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error("Error al obtener el evento:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

// Obtener todos los eventos
const getAllEvents = async (req, res) => {
  try {
    // Obtener todos los eventos con la información de los usuarios asociados
    const events = await Event.findAll({});

    res.status(200).json(events);
  } catch (error) {
    console.error("Error al obtener todos los eventos:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

// Obtener todos los eventos asociados a un usuario
const getAllEventsByUserId = async (req, res) => {
  try {
    // Extraer el ID del usuario del token JWT
    const userId = req.user.userId;

    // Buscar al usuario por su ID
    const user = await Usuario.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Obtener todos los eventos asociados al usuario
    const events = await Event.findAll({
      where: { userId: userId },
    });

    res.status(200).json(events);
  } catch (error) {
    console.error("Error al obtener los eventos del usuario:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

// Configurar Multer para guardar archivos en una carpeta específica
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Guardar archivos en la carpeta "uploads"
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname); // Asignar el nombre original del archivo
  }
});

// Crear el middleware de Multer
const upload = multer({ storage: storage });

// Crear un nuevo evento
const createEvent = async (req, res) => {

  // Esperar a que se resuelva la promesa para obtener el tipo de usuario
  const tipoUsuario = await req.user.tipo_usuario;


  // Verificar si el usuario es un organizador
  if (tipoUsuario !== 'organizador') {
      return res.status(403).json({ message: 'No tienes permiso para crear eventos' });
  }

  try {
      const { title, description, date, attendees, location, longitud, latitud } = req.body;

      // Extraer el ID del usuario del token JWT
      const userId = req.user.userId;

      // Si se subió una imagen, obtener la ruta/nombre del archivo
      const imageUrl = req.file ? req.file.path : null;

      // Crear el evento en la base de datos
      const event = await Event.create({
          title,
          description,
          date,
          image: imageUrl, // Guardar la ruta de la imagen en la base de datos,
          attendees,
          location,
          longitud,
          latitud,
          userId
      });

      res.status(201).json({ message: 'Evento creado exitosamente', event });
  } catch (error) {
      console.error('Error al crear un nuevo evento:', error);
      res.status(500).json({ message: 'Error del servidor' });
  }
};

// Actualizar un evento existente
const updateEvent = async (req, res) => {
  // Esperar a que se resuelva la promesa para obtener el tipo de usuario
  const tipoUsuario = await req.user.tipo_usuario;

  // Verificar si el usuario es un organizador
  if (tipoUsuario !== "organizador") {
    return res
      .status(403)
      .json({
        message: "No tienes permiso para actualizar eventos",
        user: req.user,
      });
  }

  try {
    const eventId = req.params.eventId;
    const {
      title,
      description,
      date,
      image,
      attendees,
      location,
      longitud,
      latitud,
    } = req.body;

    // Buscar el evento en la base de datos
    const event = await Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    // Actualizar los datos del evento
    event.title = title;
    event.description = description;
    event.date = date;
    event.image = image;
    event.attendees = attendees;
    event.location = location;
    event.longitud = longitud;
    event.latitud = latitud;

    // Guardar los cambios en la base de datos
    await event.save();

    res.status(200).json({ message: "Evento actualizado exitosamente" });
  } catch (error) {
    console.error("Error al actualizar el evento:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

// Eliminar un evento existente
const deleteEvent = async (req, res) => {
  // Esperar a que se resuelva la promesa para obtener el tipo de usuario
  const tipoUsuario = await req.user.tipo_usuario;

  // Verificar si el usuario es un organizador
  if (tipoUsuario !== "organizador") {
    return res
      .status(403)
      .json({ message: "No tienes permiso para eliminar eventos" });
  }

  try {
    const eventId = req.params.eventId;

    // Buscar el evento en la base de datos
    const event = await Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    // Eliminar el evento de la base de datos
    await UserEvent.destroy({ where: { eventId: eventId } });
    await event.destroy();

    res.status(200).json({ message: "Evento eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el evento:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};
module.exports = {
  getEventById,
  getAllEvents,
  getAllEventsByUserId,
  upload,
  createEvent,
  updateEvent,
  deleteEvent,
};
