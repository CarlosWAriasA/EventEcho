const Usuario = require("../models/usuarioModel");

const obtenerTipoDeUsuario = async (userId) => {
  try {
    // Realiza una consulta a la base de datos para obtener el usuario por su ID
    const usuario = await Usuario.findByPk(userId);

    // Verifica si se encontró el usuario
    if (!usuario) {
      return null;
    }

    // Devuelve el tipo de usuario del usuario encontrado
    return usuario.tipo_usuario;
  } catch (error) {
    console.error("Error al obtener el tipo de usuario:", error);
    throw error; // Reenvía el error para manejarlo en la función que llama a obtenerTipoDeUsuario
  }
};

module.exports = obtenerTipoDeUsuario;
