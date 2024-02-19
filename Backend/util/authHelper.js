const jwt = require('jsonwebtoken');

const generarToken = (userId) => {
    return jwt.sign({ userId }, 'tu_secreto_secreto', { expiresIn: '1d' });
};

const verificarToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, 'tu_secreto_secreto', (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
};

module.exports = { generarToken, verificarToken };
