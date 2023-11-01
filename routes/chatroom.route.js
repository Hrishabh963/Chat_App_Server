const { postChatroom, getAllChatrooms, joinChatRoom } = require('../controllers/chatroom.controller');
const { jwtAuth } = require('../middlewares/authHandler.middleware');

const router = require('express').Router();


router.post('/createRoom', jwtAuth, postChatroom);

router.get('/getChatrooms', jwtAuth, getAllChatrooms)

router.put('/joinChatroom/:chatRoomId', jwtAuth, joinChatRoom)

module.exports.chatRoomRouter = router