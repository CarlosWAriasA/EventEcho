const bcrypt = require('bcrypt');
const connection = require('../connection/connection'); // Importa la conexión desde tu archivo db.js
const { generarToken } = require('../util/authHelper');

// Función para iniciar sesión
const iniciarSesion = (req, res) => {
    const { email, password } = req.body;

    // Realizar la consulta a la base de datos
    const query = 'SELECT * FROM tbl_usuario WHERE email = ?';
    connection.query(query, [email], async (error, results) => {
        if (error) {
            console.error("Error al realizar la consulta:", error);
            return res.status(500).json({
                ok: false,
                msg: 'Hubo un error al iniciar sesión'
            });
        }

        // Verificar si se encontró un usuario con el email proporcionado
        if (results.length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'Revisa los datos ingresados'
            });
        }

        const usuario = results[0];

        // Verificar la contraseña utilizando bcrypt
        try {
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
            console.error("Error al comparar contraseñas:", error);
            return res.status(500).json({
                ok: false,
                msg: 'Hubo un error al iniciar sesión'
            });
        }
    });
};

module.exports = { iniciarSesion };
