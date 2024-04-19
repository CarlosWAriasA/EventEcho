const Notificacion = require("../models/Notificacion");
const User = require("../models/usuarioModel");

const getNotificaciones = async (userRecieverId) => {
  try {
    const notificaciones = await Notificacion.findAll({
      where: { userRecieverId },
      include: [{ model: User }],
    });
    return notificaciones;
  } catch (error) {
    console.error("Error getting comentarios:", error);
    throw error;
  }
};

const addNotificacion = async (
  description,
  userRecieverId,
  source,
  reference,
  userId
) => {
  try {
    const newNotificacion = await Notificacion.create({
      description,
      userRecieverId,
      source,
      reference,
      userSenderId: userId,
      date: Date.now(),
    });
    return newNotificacion;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

module.exports = {
  getNotificaciones,
  addNotificacion,
};
