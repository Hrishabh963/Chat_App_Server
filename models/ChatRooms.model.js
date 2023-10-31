const mongoose = require("mongoose");
const chatRoomSchema = mongoose.Schema({})
module.exports.chatRoomSchema = chatRoomSchema;
module.exports.chatRoomModel = mongoose.model('Chatrooms', chatRoomSchema);