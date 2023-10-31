const { UserModel } = require('../models/User.model');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config();

const signup = async(req, res, next) => {
    try {
        const { username, password, firstName, lastName, email } = req.body;
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" })
        }
        const newUser = await UserModel.create({ username, password, firstName, lastName, email: { email } })
        const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, { expiresIn: "24h" });
        const option = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
        res.status(201).cookie("token", token, option).json({
            token: token,
            success: true,
            data: {
                username: existingUser.username,
                email: existingUser.email
            }
        })
    } catch (error) {
        next(error);
    }
}

const login = async(req, res, next) => {
    const { username, password } = req.body;
    try {
        const existingUser = await UserModel.findOne({ username });
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid username or password" });
        }
        if (existingUser && (await bcrypt.compare(password, existingUser.password))) {
            const token = jwt.sign({ id: existingUser._id }, process.env.SECRET_KEY, { expiresIn: "24h" });
            const option = {
                expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            res.status(200).cookie("token", token, option).json({
                token: token,
                success: true,
                data: {
                    username: existingUser.username,
                    email: existingUser.email
                }
            })
        } else {
            return res.status(400).json({ message: "Invalid username or password" });
        }

    } catch (error) {
        next(error)
    }
}

module.exports = { signup, login }