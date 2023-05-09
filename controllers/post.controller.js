const db = require('../models');
const User = db.user;
const Post = db.post;

exports.createPost = async (req, res) => {
  try {
    const userId = req.userId;
    const newPost = new Post({ ...req.body, author: userId });
    await newPost.save();
    await User.findByIdAndUpdate(userId, { $push: { posts: newPost._id } });
    res.status(200).json(newPost);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).send(getValidationErrors(error));
    }
    res.status(500).send({ message: error.message });
  }
};

exports.getMyPosts = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).populate({
      path: 'posts',
      options: { sort: { createdAt: -1 } },
      populate: { path: 'likes', select: 'firstName lastName' },
    });
    res.status(200).json(user.posts);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getNewslinePosts = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate({
      path: 'friends',
      select: 'requester recipient',
      match: { status: 'added' },
    });

    const friendsIds = user.friends.map((friendship) => {
      return friendship.requester.toString() !== userId
        ? friendship.requester
        : friendship.recipient;
    });

    const newslineIds = friendsIds.concat(userId);

    const friendsPosts = await Post.find({ author: { $in: newslineIds } })
      .populate({ path: 'likes', select: 'firstName lastName' })
      .sort({ createdAt: -1 });

    res.status(200).json(friendsPosts);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.addLike = async (req, res) => {
  try {
    const userId = req.userId;
    const postId = req.params.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post does not exist' });
    }

    if (post.likes.includes(userId)) {
      return res.status(400).json({ message: 'You have already set like to this post' });
    }

    post.likes.push(userId);
    await post
      .save()
      .then((post) => post.populate({ path: 'likes', select: 'firstName lastName' }));

    res.status(200).json(post);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.deleteLike = async (req, res) => {
  try {
    const userId = req.userId;
    const postId = req.params.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post does not exist' });
    }

    if (!post.likes.includes(userId)) {
      return res.status(400).json({ message: 'You have not set like to this post' });
    }

    post.likes = post.likes.filter((like) => {
      return like.toString() !== userId;
    });

    await post
      .save()
      .then((post) => post.populate({ path: 'likes', select: 'firstName lastName' }));

    res.status(200).json(post);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
