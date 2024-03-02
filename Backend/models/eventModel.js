const { DataTypes } = require('sequelize');
const sequelize = require('../connection/connection');

const Event = sequelize.define('Event', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING(255)
  },
  attendees: {
    type: DataTypes.INTEGER
  },
  location: {
    type: DataTypes.STRING(255)
  }
}, {
  tableName: 'events', // Nombre de la tabla en la base de datos
  timestamps: false // Opcional: Desactiva el registro automático de campos createdAt y updatedAt
});

module.exports = Event;
