const { getFriendsIds, getRequestsIds } = require('../helpers/getFriendsIds');
const db = require('../models');
const User = db.user;

const getProfile = async (userId) => {
  const friendsIds = await getFriendsIds(userId);
  const requestsIds = await getRequestsIds(userId);

  const friends = await User.find({ _id: { $in: friendsIds } }).select(
    'firstName lastName profilePicture',
  );
  const requests = await User.find({ _id: { $in: requestsIds } }).select(
    'firstName lastName profilePicture',
  );

  const user = await User.findById(userId)
    .select('-password')
    .populate({
      path: 'posts',
      populate: { path: 'likes', select: 'firstName lastName' },
    })
    .lean();

  user.friends = friends;
  user.requests = requests;

  return user;
};

exports.getMyProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await getProfile(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
