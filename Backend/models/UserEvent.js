const { DataTypes } = require('sequelize');
const sequelize = require('../connection/connection');
const Event = require('./eventModel');
const Usuario = require('./usuarioModel');

const UserEvent = sequelize.define('UserEvent', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
}, {
  tableName: 'user_event',
  timestamps: false
});

UserEvent.associate = (models) => {
  UserEvent.belongsTo(models.Event);
  UserEvent.belongsTo(models.Usuario);
};

module.exports = UserEvent;
