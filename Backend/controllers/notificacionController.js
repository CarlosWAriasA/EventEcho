const Notificacion = require("../models/Notificacion");
const User = require("../models/usuarioModel");
const Comentario = require("../models/Comentario");
const fs = require("fs");

const getNotificaciones = async (req, res) => {
  const { userRecieverId, source } = req.query;

  try {
    const notificaciones = await Notificacion.findAll({
      where: { userRecieverId, source },
      include: [{ model: User }],
      order: [["date", "DESC"]],
    });

    const comentariosId = notificaciones
      .filter((n) => n.source === "C")
      .map((n) => n.reference);

    const comentarios = await Comentario.findAll({
      where: { id: comentariosId },
      include: [{ model: User }],
    });

    const result = notificaciones.map((n) => {
      if (n.source === "C" && n.reference > 0) {
        const comentario = comentarios.find((c) => c.id === n.reference);
        n.dataValues.Comentario = comentario;
        if (comentario && comentario.Usuario) {
          const usuario = comentario.Usuario.dataValues;
          if (usuario.profileImage && fs.existsSync(usuario.profileImage)) {
            const imageData = fs.readFileSync(usuario.profileImage);
            n.dataValues.Comentario.Usuario.dataValues.image64 =
              imageData.toString("base64");
          }
        }
      }
      if (n.Usuario) {
        const usuario = n.Usuario.dataValues;
        if (usuario.profileImage && fs.existsSync(usuario.profileImage)) {
          const imageData = fs.readFileSync(usuario.profileImage);
          n.dataValues.Usuario.dataValues.image64 =
            imageData.toString("base64");
        }
      }
      return n;
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error getting comentarios:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const addNotificacion = async (req, res) => {
  const userId = req.user.userId;
  const { description, userRecieverId, source, reference } = req.body;

  if (!description) {
    return res
      .status(400)
      .json({ ok: false, msg: "La descripcion no puede ser vacia" });
  }

  try {
    const newNotificacion = await Notificacion.create({
      description,
      userRecieverId,
      source,
      reference,
      useSenderId: userId,
      date: Date.now(),
    });
    return res.status(201).json(newNotificacion);
  } catch (error) {
    console.error("Error adding comment:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const updateNotificacion = async (req, res) => {
  const { id, read } = req.body;

  try {
    const notificacionExist = await Notificacion.findOne({ where: { id } });

    if (!notificacionExist) {
      return res
        .status(400)
        .json({ ok: false, msg: "Esta notificacion no existe" });
    }

    notificacionExist.read = read;

    await notificacionExist.save();

    return res.status(201).json(notificacionExist);
  } catch (error) {
    console.error("Error adding comment:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getNotificaciones,
  addNotificacion,
  updateNotificacion,
};
