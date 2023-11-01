const ChatRoom = require("../models/ChatRooms.model");
const { UserModel } = require("../models/User.model");

const postChatroom = async(req, res, next) => {
    try {
        const { name, description } = req.body;
        const userId = req.user.id;
        const exisitingUser = await UserModel.findById(userId);
        if (!exisitingUser) {
            return res.status(400).json({ message: "Invalid user" });
        }
        const newChatroom = await ChatRoom.create({
            name: name,
            description: description,
            users: [userId],
            owner: userId
        })
        exisitingUser.chatrooms.push(newChatroom._id);
        await exisitingUser.save();
        return res.status(201).json(newChatroom);
    } catch (error) {
        next(error);
    }
}

const getAllChatrooms = async(req, res, next) => {
    try {
        const chatRooms = await ChatRoom.find({});
        res.status(200).json(chatRooms);
    } catch (error) {
        next(error);
    }
}

const joinChatRoom = async(req, res, next) => {
    try {
        const { chatRoomId } = req.params;
        const userId = req.user.id;

        // Check if the user is already a member of the chat room
        const user = await UserModel.findById(userId);
        if (user.chatrooms.includes(chatRoomId)) {
            return res.status(400).json({ message: 'User is already a member of the chat room' });
        }

        // Check if the chat room exists
        const chatRoom = await ChatRoom.findById(chatRoomId);
        if (!chatRoom) {
            return res.status(404).json({ message: 'Chat room not found' });
        }

        // Add the user to the chat room's users array
        chatRoom.users.push(userId);
        await chatRoom.save();

        // Add the chat room to the user's chatrooms array
        user.chatrooms.push(chatRoomId);
        await user.save();

        res.status(200).json(chatRoom);
    } catch (error) {
        next(error);
    }
}

module.exports = { postChatroom, getAllChatrooms, joinChatRoom }