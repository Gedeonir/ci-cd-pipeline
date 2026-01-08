const authorizeAdminMiddleware = (req, res, next) => {
    console.log(req.user);
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ error: 'Forbidden: Admins only' });
    }
};

module.exports = authorizeMiddleware;