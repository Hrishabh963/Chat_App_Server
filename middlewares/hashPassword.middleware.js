const bcrypt = require('bcrypt');
const hashPassword = async(req, res, next) => {
    try {
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashPassword;
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = hashPassword;