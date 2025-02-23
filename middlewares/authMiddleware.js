const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: "Accès non autorisé" });

    jwt.verify(token, 'secretKey', (err, decoded) => {
        if (err) return res.status(401).json({ message: "Token invalide" });
        req.userId = decoded.userId;
        req.role = decoded.role;
        next();
    });
};

module.exports = authMiddleware;
