const UsuarioModel = require("../models/usuarioModel");
const EventModel = require("../models/eventModel");
const UserEventsModel = require("../models/UserEvent");
const ComentariosModel = require("../models/Comentario");
const NotificacionModel = require("../models/Notificacion");

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

  ComentariosModel.belongsTo(EventModel, { foreignKey: "eventId" });
  EventModel.hasMany(ComentariosModel, { foreignKey: "eventId" });

  ComentariosModel.belongsTo(UsuarioModel, { foreignKey: "userId" });
  UsuarioModel.hasMany(ComentariosModel, { foreignKey: "userId" });

  NotificacionModel.belongsTo(UsuarioModel, { foreignKey: "userRecieverId" });
  UsuarioModel.hasMany(NotificacionModel, { foreignKey: "userRecieverId" });

  NotificacionModel.belongsTo(UsuarioModel, {
    foreignKey: "userSenderId",
  });
  UsuarioModel.hasMany(NotificacionModel, {
    foreignKey: "userSenderId",
  });
};

module.exports = defineAssociations;
