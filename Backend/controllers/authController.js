const bcrypt = require('bcrypt');
const Usuario = require('../models/usuarioModel');
const { generarToken } = require('../util/authHelper');

const iniciarSesion = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar el usuario en la base de datos por su email
        const usuario = await Usuario.findOne({ where: { email } });

        // Verificar si se encontró un usuario con el email proporcionado
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Revisa los datos ingresados'
            });
        }

        // Verificar la contraseña utilizando bcrypt
        const passwordValido = await bcrypt.compare(password, usuario.password);

        if (!passwordValido) {
            return res.status(400).json({
                ok: false,
                msg: 'Revisa los datos ingresados'
            });
        }

        // Si las credenciales son válidas, generamos el token y lo enviamos en la respuesta
        const token = generarToken(usuario.id);

        return res.status(200).json({
            ok: true,
            token // Enviar el token como respuesta
        });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        return res.status(500).json({
            ok: false,
            msg: 'Hubo un error al iniciar sesión'
        });
    }
};

module.exports = { iniciarSesion };
