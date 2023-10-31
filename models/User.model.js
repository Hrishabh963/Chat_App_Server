const mongoose = require('mongoose');
const { chatRoomSchema } = require('./ChatRooms.model')

const EmailSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,

    }
});

const User = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String
    },
    email: {
        type: EmailSchema,
    },
    password: {
        type: String,
        required: true
    },
    chatrooms: {
        type: [chatRoomSchema],
        default: []
    }
}, {
    timestamps: true,
})
module.exports.UserSchema = User;
module.exports.UserModel = mongoose.model('User', User);