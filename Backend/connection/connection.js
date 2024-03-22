const { Sequelize } = require("sequelize");

// Variables de entorno
require("dotenv").config();

const {
  MYSQLUSER,
  MYSQL_ROOT_PASSWORD,
  MYSQL_HOST,
  MYSQL_DATABASE,
  MYSQL_PORT,
} = process.env;

// Configura la conexión a la base de datos
const sequelize = new Sequelize(
  MYSQL_DATABASE,
  MYSQLUSER,
  MYSQL_ROOT_PASSWORD,
  {
    host: MYSQL_HOST,
    dialect: "mysql",
    port: MYSQL_PORT,
    logging: false,
  }
);

// Prueba la conexión a la base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión establecida correctamente.");
  })
  .catch((err) => {
    console.error("No se pudo conectar a la base de datos:", err);
  });

module.exports = sequelize;
