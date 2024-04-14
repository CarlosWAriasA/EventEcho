const authHelper = require("../util/authHelper");
const usuarioModel = require("../models/usuarioModel");
const { enviarCorreo } = require("./correoControlador");

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    // Verificar si el usuario existe en la base de datos
    const usuario = await usuarioModel.findOne({ where: { email } });

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "No se encontró ningún usuario con este correo electrónico",
      });
    }

    // Generar un token único para restablecer la contraseña
    const resetToken = authHelper.generarToken(
      usuario.id,
      usuario.tipo_usuario
    );

    // Almacenar el token en la base de datos
    usuario.resetPasswordToken = resetToken;
    usuario.resetPasswordExpires = Date.now() + 3600000; // La fecha de expiración es en una hora

    await usuario.save();
    console.log(req.headers);
    // Enviar un correo electrónico con el enlace de restablecimiento de contraseña
    const resetURL = `${req.headers.origin}/reset-password/${resetToken}`;

    const destinatario = usuario.email;
    const asunto = "Restablecer contraseña";
    const plantillaNombre = "recuperar_contraseña_evento.html";
    const datos = {
      expiresIn: "1", // La fecha de expiración es en una hora
      resetURL,
    };

    await enviarCorreo(destinatario, asunto, plantillaNombre, datos);

    return res.status(200).json({
      message:
        "Se ha enviado un correo electrónico con las instrucciones para restablecer la contraseña",
    });
  } catch (error) {
    console.error(
      "Error al procesar la solicitud de restablecimiento de contraseña:",
      error
    );
    return res.status(500).json({ message: "Error del servidor" });
  }
};

module.exports = {
  forgotPassword,
};
