const bcrypt = require('bcrypt');
const Usuario = require('../models/usuarioModel');

const registrarUsuario = async (req, res) => {
    const { name, lastName, username, email, password, tipo_usuario } = req.body;

    try {
        // Verificar si el usuario ya existe en la base de datos
        const usuarioExistente = await Usuario.findOne({ where: { email } });

        if (usuarioExistente) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            });
        }

        // Hashear la contraseña antes de guardarla en la base de datos
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar el nuevo usuario en la base de datos
        await Usuario.create({
            name,
            lastName,
            username,
            email,
            password: hashedPassword,
            tipo_usuario // Añadir el nuevo campo userType
        });

        console.log('Registrado');
        return res.status(200).json({
            ok: true,
            msg: 'El usuario ha sido registrado con éxito'
        });
    } catch (error) {
        console.error("Error al registrar el usuario:", error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al registrar el usuario',
            error
        });
    }
};

module.exports = { registrarUsuario };
