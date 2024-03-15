const { DataTypes } = require("sequelize");
const sequelize = require("../connection/connection");
const Event = require("./eventModel");
const Usuario = require("./usuarioModel");

const UserEvent = sequelize.define(
  "UserEvent",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "user_event",
    timestamps: false,
  }
);

UserEvent.associate = (models) => {
  UserEvent.belongsTo(models.Event, { foreignKey: "eventId" });
  UserEvent.belongsTo(models.Usuario, { foreignKey: "userId" });
};

module.exports = UserEvent;
