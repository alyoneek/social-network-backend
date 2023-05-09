const db = require('../models');
const User = db.user;

const getFriendsIds = async (userId) => {
  const user = await User.findById(userId).populate({
    path: 'friends',
    select: 'requester recipient',
    match: { status: 'added' },
  });

  const friendsIds = user.friends.map((friendship) =>
    friendship.requester.toString() !== userId ? friendship.requester : friendship.recipient,
  );

  return friendsIds;
};

const getRequestsIds = async (userId) => {
  const user = await User.findById(userId).populate({
    path: 'friends',
    select: 'requester recipient',
    match: { status: 'requested' },
  });

  const requestsIds = user.friends.reduce((result, friendship) => {
    if (friendship.recipient.toString() === userId) result.push(friendship.requester);
    return result;
  }, []);

  console.log(requestsIds);

  return requestsIds;
};

module.exports = { getFriendsIds, getRequestsIds };
