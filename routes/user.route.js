const express = require('express');
const verifyToken = require('../middlewares/auth');
const UserController = require('../controllers/user.controller');

const router = express.Router();

router.get('/me', [verifyToken], UserController.getMyProfile);

module.exports = router;
