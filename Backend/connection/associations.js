const UsuarioModel = require("../models/usuarioModel");
const EventModel = require("../models/eventModel");
const UserEventsModel = require("../models/UserEvent");

const defineAssociations = () => {
  UsuarioModel.hasMany(EventModel, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  });
  EventModel.belongsTo(UsuarioModel, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  });

  UserEventsModel.belongsTo(EventModel, { foreignKey: "eventId" });
  EventModel.hasMany(UserEventsModel, { foreignKey: "eventId" });

  UserEventsModel.belongsTo(UsuarioModel, { foreignKey: "userId" });
  UsuarioModel.hasMany(UserEventsModel, { foreignKey: "userId" });
};

module.exports = defineAssociations;
