const UserEvent = require("../models/UserEvent");
const Event = require("../models/eventModel");
const User = require("../models/usuarioModel");

const getUserIsRegister = async (req, res) => {
  const userId = req.user.userId;
  const { eventId } = req.params;
  try {
    const eventExist = await Event.findOne({ where: { id: eventId } });

    if (!eventExist) {
      return res.status(200).json({ ok: false, msg: "Este Evento no existe" });
    }

    const userEvents = await UserEvent.findOne({
      where: { userId, eventId },
    });

    if (userEvents) {
      return res.status(200).json({ ok: true, isRegister: true });
    } else {
      return res.status(200).json({ ok: true, isRegister: false });
    }
  } catch (error) {
    console.error("Error getting user events:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getUserEvents = async (req, res) => {
  const userId = req.user.userId;

  try {
    const userEvents = await UserEvent.findAll({
      where: { userId },
      include: [{ model: Event }, { model: User }],
    });

    return res.status(200).json(userEvents);
  } catch (error) {
    console.error("Error getting user events:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const addUserEvent = async (req, res) => {
  const userId = req.user.userId;
  const { eventId } = req.body;

  try {
    const eventExist = await Event.findOne({ where: { id: eventId } });

    if (!eventExist) {
      return res.status(200).json({ ok: false, msg: "Este Evento no existe" });
    }

    const existingUserEvent = await UserEvent.findOne({
      where: { eventId, userId },
    });
    if (existingUserEvent) {
      return res.status(200).json({
        ok: false,
        msg: "Este Usuario ya esta inscrito en este evento",
      });
    }

    const newUserEvent = await UserEvent.create({ eventId, userId });
    return res.status(201).json(newUserEvent);
  } catch (error) {
    console.error("Error adding user event:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteUserEvent = async (req, res) => {
  const userId = req.user.userId;
  const { eventId } = req.body;
  console.log(eventId);
  try {
    const eventExist = await Event.findOne({ where: { id: eventId } });

    if (!eventExist) {
      return res.status(200).json({ ok: false, msg: "Este Evento no existe" });
    }

    const userEventToDelete = await UserEvent.findOne({
      where: { eventId, userId },
    });
    if (!userEventToDelete) {
      return res.status(200).json({
        ok: false,
        msg: "Este usuario no esta inscrito en este evento",
      });
    }

    await userEventToDelete.destroy();
    return res
      .status(200)
      .json({ message: "Ya no esta registrado en este evento" });
  } catch (error) {
    console.error("Error deleting user event:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addUserEvent,
  deleteUserEvent,
  getUserEvents,
  getUserIsRegister,
};
