const express = require('express');
const verifyToken = require('../middlewares/auth');
const FriendController = require('../controllers/friend.controller');

const router = express.Router();

router.get('/', [verifyToken], FriendController.getFriends);
router.get('/requested', [verifyToken], FriendController.getRequests);
router.post('/:id', [verifyToken], FriendController.addFriend);
router.post('/:id/accept', [verifyToken], FriendController.acceptFriend);
router.delete('/:id', [verifyToken], FriendController.deleteFriend);

module.exports = router;
