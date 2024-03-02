const bcrypt = require('bcrypt');
const connection = require('../connection/connection'); // Importa la conexión desde tu archivo db.js

const registrarUsuario = async (req, res) => {
    const { name, lastName, username, email, password } = req.body;

    console.log(req.body);

    try {
        // Verificar si el usuario ya existe en la base de datos
        const query = 'SELECT * FROM tbl_usuario WHERE email = ?';
        connection.query(query, [email], async (error, results) => {
            if (error) {
                console.error("Error al realizar la consulta:", error);
                return res.status(500).json({
                    ok: false,
                    msg: 'Hubo un error al registrar el usuario'
                });
            }

            if (results.length > 0) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El usuario ya existe'
                });
            }

            // Hashear la contraseña antes de guardarla en la base de datos
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insertar el nuevo usuario en la base de datos
            const insertQuery = 'INSERT INTO tbl_usuario (name, lastName, username, email, password) VALUES (?, ?, ?, ?, ?)';
            connection.query(insertQuery, [name, lastName, username, email, hashedPassword], (error, results) => {
                if (error) {
                    console.error("Error al registrar el usuario:", error);
                    return res.status(500).json({
                        ok: false,
                        msg: 'Hubo un error al registrar el usuario'
                    });
                }

                console.log('Registrado');
                return res.status(200).json({
                    ok: true,
                    msg: 'El usuario ha sido registrado con éxito'
                });
            });
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
