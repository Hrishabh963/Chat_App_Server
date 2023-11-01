const mongoose = require("mongoose");
const chatRoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    }, ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message', // Reference to the Message model
    }, ],
}, {
    timestamps: true
});

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);


module.exports = ChatRoom;