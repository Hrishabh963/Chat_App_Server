const express = require('express');
const logger = require('morgan');
const { errorLogger, errorResponder, errorPath } = require('../middlewares/errorHandler.middleware');
const app = express();
const cors = require('cors');
const { userRouter } = require('../routes/user.route');
const cookieParser = require('cookie-parser');
const { homeRouter } = require('../routes/home.route');
const { chatRoomRouter } = require('../routes/chatroom.route');
const { messageRouter } = require('../routes/message.route');


//Configuring middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser())

//Setting up routes
app.use('/user', userRouter);
app.use('/home', homeRouter);
app.use('/chatroom', chatRoomRouter);
app.use('/message', messageRouter)

//Error handlers
app.use(errorLogger);
app.use(errorResponder);
app.use(errorPath)

module.exports = app;