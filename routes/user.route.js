const router = require('express').Router();
const hashPassword = require('../middlewares/hashPassword.middleware');
const { signup, login } = require('../controllers/user.controller')

//Different routes
router.post('/signup', hashPassword, signup);
router.post('/login', login);

module.exports.userRouter = router