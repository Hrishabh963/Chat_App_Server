const { homePage } = require('../controllers/home.controller');
const { jwtAuth } = require('../middlewares/authHandler.middleware');

const router = require('express').Router();
router.get('/', jwtAuth, homePage)
module.exports.homeRouter = router;