const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Usuario = require('../models/usuarioModel');
const { enviarCorreo } = require('./correoControlador');

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

        // Enviar correo electrónico de registro
        const destinatario = email;
        const asunto = '¡Bienvenido a nuestro sitio!';
        const plantillaNombre = 'registro.html';
        const datos = {
            nombre: name,
        };

        await enviarCorreo(destinatario, asunto, plantillaNombre, datos);

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

// Configurar Multer para guardar archivos en una carpeta específica
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/profiles/'); // Guardar archivos en la carpeta "uploads/profiles"
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Asignar un nombre único al archivo
    }
});

// Crear el middleware de Multer
const upload = multer({ storage: storage });

const editarUsuario = async (req, res) => {
    // Extraer el ID del usuario desde el token JWT
    const id = req.user.userId;
    
    const { name, lastName, username, email, password, tipo_usuario } = req.body;

    try {
        // Verificar si el usuario existe en la base de datos
        const usuarioExistente = await Usuario.findByPk(id);

        if (!usuarioExistente) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no fue encontrado'
            });
        }

        // Obtener la ruta de la imagen anterior, si existe
        const imagenAnterior = usuarioExistente.profileImage;

        // Actualizar los campos del usuario
        await usuarioExistente.update({
            name,
            lastName,
            username,
            email,
            password,
            tipo_usuario,
            profileImage: req.file ? req.file.path : null // Guardar la ruta de la nueva imagen de perfil si se proporciona una nueva imagen
        });

        console.log('Usuario actualizado');

        // Eliminar la imagen anterior del servidor si existe y se proporciona una nueva imagen
        if (req.file && imagenAnterior) {
            fs.unlinkSync(imagenAnterior);
        }

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

module.exports = { registrarUsuario, upload, editarUsuario, obtenerUsuario };
