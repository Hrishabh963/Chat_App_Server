const express = require('express');
const logger = require('morgan');
const { errorLogger, errorResponder, errorPath } = require('../middlewares/errorHandler.middleware');
const app = express();
const cors = require('cors');
const { userRouter } = require('../routes/user.route');
const cookieParser = require('cookie-parser');
const { chatRoomRouter } = require('../routes/chatroom.route');
const { messageRouter } = require('../routes/message.route');
require('dotenv').config()

//Configuring middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser())

const http = require('node:http');
const { Server } = require('socket.io');

//Socket.io initialisation
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.FRONT_END_URL,
        methods: ["GET", "POST"]
    }
});


//Setting up routes
app.use('/user', userRouter);
app.use('/chatroom', chatRoomRouter);
app.use('/message', messageRouter)


//socket.io logic here
io.on('connection', (socket) => {

    console.log("A user connected:", socket.id);

    socket.on('join_chatroom', (roomId) => {
        console.log(`User ${socket.id} is joining chatroom ${roomId}`);
        socket.join(roomId);
    });

    socket.on("send_message", (data) => {
        console.log(data.chatroomId);
        socket.broadcast.to(data.chatroomId).emit("receive_message", data.message);
    })
})


//Error handlers
app.use(errorLogger);
app.use(errorResponder);
app.use(errorPath)

module.exports = server;