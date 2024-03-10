const { DataTypes } = require('sequelize');
const sequelize = require('../connection/connection');
const Event = require('./eventModel');
const UserEvent = require('./UserEvent');

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo_usuario: {
        type: DataTypes.ENUM('organizador', 'usuario'), // Enumeración para definir el tipo de usuario
        allowNull: false,
        defaultValue: 'usuario' // Valor por defecto
    }
},
    {
        tableName: 'tbl_usuario',
        timestamps: false
    });

// Define la asociación muchos a muchos con el modelo de Evento
Usuario.associate = (models) => {
    Usuario.belongsToMany(models.Event, { through: 'UserEvent' });
};

module.exports = Usuario;
