const { verificarToken } = require("../util/authHelper");
const obtenerTipoDeUsuario = require("../util/obtenerTipoDeUsuario");

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(400).json({ message: "No autorizado" });
  }

  try {
    const decoded = await verificarToken(token);
    req.user = {
      userId: decoded.userId,
      tipo_usuario: obtenerTipoDeUsuario(decoded.userId), // Obtener el tipo de usuario y asignarlo a req.user
    };

    next();
  } catch (error) {
    return res.status(400).json({ message: "Token inválido" });
  }
};

module.exports = { authenticateToken };
