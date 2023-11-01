const mongoose = require('mongoose');

// Create a Message schema
const messageSchema = new mongoose.Schema({
    text: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;