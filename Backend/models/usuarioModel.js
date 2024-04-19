const { DataTypes } = require("sequelize");
const sequelize = require("../connection/connection");

const Usuario = sequelize.define(
  "Usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "El campo email debe ser un correo electrónico válido",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo_usuario: {
      type: DataTypes.ENUM("organizador", "usuario"),
      allowNull: false,
      defaultValue: "usuario",
    },
    profileImage: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    // Otros campos de usuario...
    resetPasswordToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    resetPasswordExpires: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    tableName: "tbl_usuario",
    timestamps: false,
  }
);

module.exports = Usuario;
