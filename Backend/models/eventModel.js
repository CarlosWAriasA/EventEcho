const { DataTypes } = require("sequelize");
const sequelize = require("../connection/connection");

const Event = sequelize.define(
  "Evento",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(255),
    },
    attendees: {
      type: DataTypes.INTEGER,
    },
    location: {
      type: DataTypes.STRING(255),
    },
    longitud: {
      // Nuevo campo para longitud
      type: DataTypes.DECIMAL(10, 8),
      allowNull: false,
    },
    latitud: {
      // Nuevo campo para latitud
      type: DataTypes.DECIMAL(10, 8),
      allowNull: false,
    },
    userId: {
      // Nuevo campo para el ID del usuario organizador
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "events",
    timestamps: false, // Opcional: Desactiva el registro automático de campos createdAt y updatedAt
  }
);

module.exports = Event;
