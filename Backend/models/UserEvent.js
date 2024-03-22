const { DataTypes } = require("sequelize");
const sequelize = require("../connection/connection");

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

module.exports = UserEvent;
