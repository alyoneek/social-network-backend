const express = require('express');

const UserRoutes = require('./routes/user.route');
const AuthRoutes = require('./routes/auth.route');
const FriendRoutes = require('./routes/friend.route');
const PostRoutes = require('./routes/post.route');

const app = express();

app.use(express.json());

app.use('/auth', AuthRoutes);
app.use('/users', UserRoutes);
app.use('/friends', FriendRoutes);
app.use('/posts', PostRoutes);

module.exports = app;
