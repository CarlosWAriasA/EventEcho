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
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
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
  },
  {
    tableName: "tbl_usuario",
    timestamps: false,
  }
);

module.exports = Usuario;
