const { verificarToken } = require('../authHelper');

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No autorizado' });
    }

    try {
        const decoded = await verificarToken(token);
        req.user = decoded.userId;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token inválido' });
    }
};

module.exports = { authenticateToken };

