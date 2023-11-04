const { postChatroom, getAllChatrooms, joinChatRoom, getAllMembers, getCurrentChatroom } = require('../controllers/chatroom.controller');
const { jwtAuth } = require('../middlewares/authHandler.middleware');

const router = require('express').Router();


router.post('/createRoom', jwtAuth, postChatroom);

router.get('/getChatrooms', jwtAuth, getAllChatrooms)

router.put('/joinChatroom/:chatRoomId', jwtAuth, joinChatRoom)

router.get('/:chatRoomId/members', jwtAuth, getAllMembers);

router.get('/getChatroom/:chatroomId', jwtAuth, getCurrentChatroom)

module.exports.chatRoomRouter = router