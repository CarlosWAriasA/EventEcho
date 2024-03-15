const UserEvent = require("../models/UserEvent");
const Event = require("../models/eventModel");

// Controller to get all events for a user
const getUserEvents = async (req, res) => {
  // por hacer
};

// Controller to add a user event registration
const addUserEvent = async (req, res) => {
  const { eventId, userId } = req.body;

  try {
    // Check if the user event registration already exists
    const existingUserEvent = await UserEvent.findOne({
      where: { eventId, userId },
    });
    if (existingUserEvent) {
      return res
        .status(400)
        .json({ error: "User event registration already exists" });
    }

    // Create a new user event registration
    const newUserEvent = await UserEvent.create({ eventId, userId });
    return res.status(201).json(newUserEvent);
  } catch (error) {
    console.error("Error adding user event:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Controller to delete a user event registration
const deleteUserEvent = async (req, res) => {
  const { eventId, userId } = req.body;

  try {
    // Find the user event registration to delete
    const userEventToDelete = await UserEvent.findOne({
      where: { eventId, userId },
    });
    if (!userEventToDelete) {
      return res
        .status(404)
        .json({ error: "User event registration not found" });
    }

    // Delete the user event registration
    await userEventToDelete.destroy();
    return res
      .status(200)
      .json({ message: "User event registration deleted successfully" });
  } catch (error) {
    console.error("Error deleting user event:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addUserEvent, deleteUserEvent, getUserEvents };
