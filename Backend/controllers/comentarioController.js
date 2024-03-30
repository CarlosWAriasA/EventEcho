const Comentario = require("../models/Comentario");
const Event = require("../models/eventModel");
const User = require("../models/usuarioModel");

const getComentarios = async (req, res) => {
  const { eventId } = req.query;

  try {
    console.log(eventId);
    const eventExist = await Event.findOne({ where: { id: eventId } });

    if (!eventExist) {
      return res.status(200).json({ ok: false, msg: "Este Evento no existe" });
    }

    const comentarios = await Comentario.findAll({
      where: { eventId },
      include: [{ model: User }],
    });

    return res.status(200).json(comentarios);
  } catch (error) {
    console.error("Error getting user events:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const addComentario = async (req, res) => {
  const userId = req.user.userId;
  const { description, eventId } = req.body;

  if (!description) {
    return res
      .status(400)
      .json({ ok: false, msg: "La descripcion no puede ser vacia" });
  }

  try {
    const eventExist = await Event.findOne({ where: { id: eventId } });

    if (!eventExist) {
      return res.status(200).json({ ok: false, msg: "Este Evento no existe" });
    }

    const newComentario = await Comentario.create({
      description,
      eventId,
      userId,
      date: Date.now(),
    });
    return res.status(201).json(newComentario);
  } catch (error) {
    console.error("Error adding user event:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getComentarios,
  addComentario,
};
