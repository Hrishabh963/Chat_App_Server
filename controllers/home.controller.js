const { UserModel } = require("../models/User.model");

const homePage = async(req, res, next) => {
    const user = req.user;
    const userId = user.id;
    try {
        const existingUser = await UserModel.findById(userId);
        if (!existingUser) {
            return res.status(400).json({ message: "User isn't logged in" })
        }
        const allUsers = await UserModel.find();
        res.status(200).json(allUsers);
    } catch (error) {
        next(error);
    }
}

module.exports = { homePage }