const ChatRoom = require("../models/ChatRooms.model");
const { UserModel } = require("../models/User.model");
const Message = require("../models/message.model");

const postMessage = async(req, res, next) => {
    const { chatroomId } = req.params;
    const { text } = req.body;
    const userId = req.user.id;
    try {
        const chatroom = await ChatRoom.findById(chatroomId);
        const message = await Message.create({ text, user: userId })
        chatroom.messages.push(message._id);
        await chatroom.save();
        res.status(201).json(message);

    } catch (error) {
        next(error);
    }
}

const getMessages = async(req, res, next) => {
    const { chatroomId } = req.params;
    try {
        const chatRoom = await ChatRoom.findById(chatroomId);
        const messages = chatRoom.messages;
        const messagesWithUser = await Promise.all(messages.map(async(message) => {
            const currentMessage = await Message.findById(message._id);
            const user = await UserModel.findById(currentMessage.user);
            user.password = undefined;
            return {
                message: currentMessage,
                user: user
            }
        }));
        return res.status(200).json(messagesWithUser);
    } catch (error) {
        next(error);
    }
}

module.exports = { postMessage, getMessages }