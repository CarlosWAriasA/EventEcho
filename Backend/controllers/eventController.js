const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");
const moment = require("moment");
const multer = require("multer");
const path = require("path");
const Event = require("../models/eventModel");
const Usuario = require("../models/usuarioModel");
const UserEvent = require("../models/UserEvent");
const Comentario = require("../models/Comentario");
const Notificacion = require("../models/Notificacion");
const { enviarCorreo } = require("./correoControlador");

// Obtener un evento por su ID
const getEventById = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const event = await Event.findByPk(eventId, {
      include: [{ model: UserEvent, include: [Usuario] }],
    });

    if (!event) {
      return res.status(400).json({ message: "Evento no encontrado" });
    }

    event.dataValues.UserEvents.map((userEvent) => {
      const usuario = userEvent.Usuario.dataValues;
      if (usuario.profileImage && fs.existsSync(usuario.profileImage)) {
        const imageData = fs.readFileSync(usuario.profileImage);
        userEvent.Usuario.dataValues.image64 = imageData.toString("base64");
      }
    });

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
    const { isPageable, page, pageSize } = req.query;

    const offset = page
      ? (parseInt(page) - 1) * (parseInt(pageSize) || 10)
      : null;

    const events = await Event.findAll(
      isPageable
        ? {
            offset,
            limit: pageSize && parseInt(pageSize),
          }
        : {}
    );

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

const getAllEventsByOrganizerId = async (req, res) => {
  try {
    // Obtener el ID del usuario organizador del token JWT
    const userId = req.user.userId;

    // Obtener todos los eventos del usuario organizador
    const allEvents = await Event.findAll({
      where: { userId: userId },
      include: [{ model: UserEvent }],
    });

    // Obtener la suma de personas en todos los eventos
    const totalAttendees = allEvents.reduce(
      (sum, event) => sum + event.attendees,
      0
    );

    // Calcular el total de eventos
    const totalEvents = allEvents.length;

    // Obtener la fecha actual
    const currentDate = moment();

    // Obtener los eventos próximos del usuario organizador
    const upcomingEvents = await Event.findAll({
      where: {
        userId: userId,
        date: { [Op.gt]: currentDate },
      },
      order: [["date", "ASC"]],
      limit: 5,
    });

    // Devolver la respuesta con todas las informaciones
    res.status(200).json({
      allEvents: allEvents,
      totalAttendees: totalAttendees,
      totalEvents: totalEvents,
      upcomingEvents: upcomingEvents,
    });
  } catch (error) {
    console.error("Error al obtener los eventos del usuario:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

// Configurar Multer para guardar archivos en una carpeta específica
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Guardar archivos en la carpeta "uploads"
  },
  filename: function (req, file, cb) {
    const uniqueFilename = uuidv4(); // Generar un UUID único
    const fileExtension = path.extname(file.originalname); // Obtener la extensión del archivo original
    const finalFilename = `${uniqueFilename}${fileExtension}`; // Combinar el UUID único con la extensión
    cb(null, finalFilename); // Asignar el nombre único del archivo
  },
});

// Crear el middleware de Multer
const upload = multer({ storage: storage });

// Crear un nuevo evento
const createEvent = async (req, res) => {
  // Esperar a que se resuelva la promesa para obtener el tipo de usuario
  const tipoUsuario = await req.user.tipo_usuario;

  // Verificar si el usuario es un organizador
  if (tipoUsuario !== "organizador") {
    return res
      .status(400)
      .json({ message: "No tienes permiso para crear eventos" });
  }

  try {
    const { title, description, date, attendees, location, longitud, latitud } =
      req.body;

    // Extraer el ID del usuario del token JWT
    const userId = req.user.userId;

    // Si se subió una imagen, obtener la ruta/nombre del archivo
    const imageUrls = req.files ? req.files.map((file) => file.path) : [];

    // Crear el evento en la base de datos
    const event = await Event.create({
      title,
      description,
      date,
      image: imageUrls, // Guardar la ruta de la imagenes en la base de datos,
      attendees,
      location,
      longitud,
      latitud,
      userId,
    });

    // Enviar confirmación por correo electrónico
    const user = await Usuario.findByPk(userId);
    const destinatario = user.email;
    const asunto = "Evento creado exitosamente";
    const plantillaNombre = "confirmacion_evento.html";
    const datos = {
      nombre_evento: title,
      fecha_evento: moment(date).format("DD/MM/YYYY HH:mm"),
      ubicacion_evento: location,
    };

    // Enviar el correo electrónico
    await enviarCorreo(destinatario, asunto, plantillaNombre, datos);

    res.status(201).json({ message: "Evento creado exitosamente", event });
  } catch (error) {
    console.error("Error al crear un nuevo evento:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

// Actualizar un evento existente
const updateEvent = async (req, res) => {
  // Esperar a que se resuelva la promesa para obtener el tipo de usuario
  const tipoUsuario = await req.user.tipo_usuario;

  // Verificar si el usuario es un organizador
  if (tipoUsuario !== "organizador") {
    return res.status(403).json({
      message: "No tienes permiso para actualizar eventos",
      user: req.user,
    });
  }

  try {
    const eventId = req.params.eventId;
    const { title, description, date, attendees, location, longitud, latitud } =
      req.body;

    // Buscar el evento en la base de datos
    const event = await Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    // Actualizar los datos del evento
    event.title = title;
    event.description = description;
    event.date = date;
    event.attendees = attendees;
    event.location = location;
    event.longitud = longitud;
    event.latitud = latitud;

    // Actualizar las imágenes si se proporcionan nuevas imágenes
    if (req.files && req.files.length > 0) {
      // Eliminar las imágenes antiguas si existen
      if (event.image && Array.isArray(event.image)) {
        event.image.forEach((imagePath) => {
          fs.unlinkSync(imagePath);
        });
      }

      // Guardar las rutas de las nuevas imágenes
      event.image = req.files.map((file) => file.path);
    }

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
      .status(400)
      .json({ message: "No tienes permiso para eliminar eventos" });
  }

  try {
    const eventId = req.params.eventId;

    // Buscar el evento en la base de datos
    const event = await Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    // Eliminar las imágenes asociadas al evento del servidor
    if (event.image) {
      if (Array.isArray(event.image)) {
        event.image.forEach((imagePath) => {
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
        });
      } else {
        fs.unlinkSync(event.image);
      }
    }

    // Envíar un correo electrónico de cancelación a todos los usuarios inscritos y al organizador
    const users = await UserEvent.findAll({ where: { eventId: eventId } });
    const eventTitle = event.title;
    const eventDate = moment(event.date).format("DD/MM/YYYY HH:mm");
    const eventLocation = event.location;

    // Enviar un correo electrónico a todos los usuarios inscritos
    for (const user of users) {
      const userInstance = await Usuario.findByPk(user.userId);
      const destinatario = userInstance.email;
      const asunto = "Evento cancelado";
      const plantillaNombre = "cancelacion_evento.html";
      const datos = {
        nombre_evento: eventTitle,
        fecha_evento: eventDate,
        ubicacion_evento: eventLocation,
        motivo_cancelacion: "El evento ha sido cancelado por el organizador",
      };

      // Enviar el correo electrónico
      await enviarCorreo(destinatario, asunto, plantillaNombre, datos);
    }

    // Eliminar el evento de la base de datos
    await UserEvent.destroy({ where: { eventId: eventId } });
    await Comentario.destroy({ where: { eventId: eventId } });
    await Notificacion.destroy({ where: { eventId: eventId } });
    await event.destroy();

    // Enviar un correo electrónico al organizador
    const organizer = await Usuario.findByPk(event.userId);
    const destinatarioOrganizador = organizer.email;
    const asuntoOrganizador = "Evento cancelado";
    const plantillaNombreOrganizador = "cancelacion_evento.html";
    const datosOrganizador = {
      nombre_evento: eventTitle,
      fecha_evento: eventDate,
      ubicacion_evento: eventLocation,
      motivo_cancelacion: "El evento ha sido cancelado por el organizador",
    };

    // Enviar el correo electrónico al organizador
    await enviarCorreo(
      destinatarioOrganizador,
      asuntoOrganizador,
      plantillaNombreOrganizador,
      datosOrganizador
    );

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
  getAllEventsByOrganizerId,
  upload,
  createEvent,
  updateEvent,
  deleteEvent,
};
