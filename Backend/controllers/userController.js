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


//Obtener usuario por ID
const obtenerUsuario = async (req, res) => {
    const { id } = req.params;

    try {
        // Buscar el usuario por su ID
        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no fue encontrado'
            });
        }

        // Devolver el usuario encontrado
        return res.status(200).json({
            ok: true,
            usuario
        });
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al obtener el usuario',
            error
        });
    }
};

//EDITAR USUARIOS
const editarUsuario = async (req, res) => {
    const { id } = req.params;
    const { name, lastName, username, email, password,tipo_usuario } = req.body;

    try {
        // Verificar si el usuario existe en la base de datos
        const usuarioExistente = await Usuario.findByPk(id);

        if (!usuarioExistente) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no fue encontrado'
            });
        }

        // Actualizar los campos del usuario
        await usuarioExistente.update({
            name,
            lastName,
            username,
            email,
            password,
            tipo_usuario
        });

        console.log('Usuario actualizado');
        return res.status(200).json({
            ok: true,
            msg: 'El usuario ha sido actualizado con éxito'
        });
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al actualizar el usuario',
            error
        });
    }
};

//OBTENER TODOS LOS USUARIOS
// const obtenerTodosUsuarios = async (req, res) => {
//     try {
//         // Buscar todos los usuarios en la base de datos
//         const usuarios = await Usuario.findAll();

//         // Devolver los usuarios encontrados
//         return res.status(200).json({
//             ok: true,
//             usuarios
//         });
//     } catch (error) {
//         console.error("Error al obtener los usuarios:", error);
//         res.status(500).json({
//             ok: false,
//             msg: 'Hubo un error al obtener los usuarios',
//             error
//         });
//     }
// };

module.exports = { registrarUsuario, editarUsuario, obtenerUsuario };
