const db = require('../models');
const User = db.user;
const Friend = db.friend;

exports.addFriend = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const requestedUserId = req.params.id;

    const requestedUser = await User.findById(requestedUserId);

    if (!requestedUser) {
      return res.status(404).send({ message: 'User does not exist' });
    }

    if (currentUserId === requestedUserId) {
      return res.status(400).send({ message: 'You are not allowed to add yourself to friends' });
    }

    const doc = await Friend.findOne({
      $or: [
        { requester: currentUserId, recipient: requestedUserId },
        { requester: requestedUserId, recipient: currentUserId },
      ],
    });

    if (doc) {
      return res.status(400).send({ message: 'You or this user have already sent a request' });
    }

    const friendRequest = new Friend({
      requester: currentUserId,
      recipient: requestedUserId,
    });

    await friendRequest.save();

    await User.findByIdAndUpdate(currentUserId, { $push: { friends: friendRequest._id } });
    await User.findByIdAndUpdate(requestedUserId, { $push: { friends: friendRequest._id } });

    res.status(204).json();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.deleteFriend = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const requestedUserId = req.params.id;

    const requestedUser = await User.findById(requestedUserId);

    if (!requestedUser) {
      return res.status(404).send({ message: 'User does not exist' });
    }

    const doc = await Friend.findOne({
      $or: [
        { requester: currentUserId, recipient: requestedUserId },
        { requester: requestedUserId, recipient: currentUserId },
      ],
    });

    if (!doc) {
      return res.status(400).send({ message: 'You do not have a connection with this user' });
    }

    await Friend.deleteOne({ _id: doc._id });

    await User.findByIdAndUpdate(currentUserId, { $pull: { friends: doc._id } });
    await User.findByIdAndUpdate(requestedUserId, { $pull: { friends: doc._id } });

    res.status(204).json();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.acceptFriend = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const accepptedUserId = req.params.id;

    const accepptedUser = await User.findById(accepptedUserId);

    if (!accepptedUser) {
      return res.status(404).send({ message: 'User does not exist' });
    }

    const doc = await Friend.findOneAndUpdate(
      {
        requester: accepptedUserId,
        recipient: currentUserId,
        status: 'requested',
      },
      { status: 'added' },
    );

    if (!doc) {
      return res.status(400).send({ message: 'This user is not waiting for your admission' });
    }

    res.status(204).json();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
