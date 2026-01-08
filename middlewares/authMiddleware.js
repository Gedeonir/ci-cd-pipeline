const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }

    try {
        const splittedToken=token.split(' ')[1]; // Bearer <token>
        const decoded = jwt.verify(splittedToken, 'secretkey');
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Invalid token' });
    }
};

module.exports = authMiddleware;