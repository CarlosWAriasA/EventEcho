const { DataTypes } = require("sequelize");
const sequelize = require("../connection/connection");

const Notificacion = sequelize.define(
  "Notificacion",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    source: {
      type: DataTypes.CHAR("2"),
      allowNull: false,
    },
    reference: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userRecieverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userSenderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "notificaciones",
    timestamps: false,
  }
);

module.exports = Notificacion;
