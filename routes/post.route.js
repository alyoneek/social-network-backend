const express = require('express');
const verifyToken = require('../middlewares/auth');
const PostController = require('../controllers/post.controller');

const router = express.Router();

router.get('/', [verifyToken], PostController.getMyPosts);
router.get('/newsline', [verifyToken], PostController.getNewslinePosts);
router.post('/', [verifyToken], PostController.createPost);
router.post('/:id/like', [verifyToken], PostController.addLike);
router.delete('/:id/like', [verifyToken], PostController.deleteLike);

module.exports = router;
