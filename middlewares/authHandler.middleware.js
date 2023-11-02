const jwt = require('jsonwebtoken');

module.exports.jwtAuth = async(req, res, next) => {
    // Extract the token from the Authorization header
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // The Authorization header typically contains the token as "Bearer token"
    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0].toLowerCase() !== 'bearer') {
        return res.status(401).json({ message: 'Invalid token format' });
    }

    const token = tokenParts[1];

    try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};