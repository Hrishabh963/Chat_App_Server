const jwt = require('jsonwebtoken');
module.exports.jwtAuth = async(req, res, next) => {
    const token = req.cookies.token;
    try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        console.log(user);
        req.user = user;
        next();
    } catch (error) {
        res.clearCookie("token");
        next(error);
    }
}