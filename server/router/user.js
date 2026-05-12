const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controllers');
const expressJoi = require('@escook/express-joi');
const { usercheck } = require('../utils/check');

router.post('/register', expressJoi(usercheck), userController.registerController);
router.post('/login', expressJoi(usercheck), userController.loginController);
router.get('/userinfo', userController.userInfoController);

module.exports = router;