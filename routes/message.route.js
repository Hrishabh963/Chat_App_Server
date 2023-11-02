const router = require('express').Router();
const { postMessage, getMessages } = require('../controllers/message.controller');
const { jwtAuth } = require('../middlewares/authHandler.middleware');

router.post('/:chatroomId/postMessage', jwtAuth, postMessage);
router.get('/:chatroomId/getMessages', jwtAuth, getMessages)

module.exports.messageRouter = router;