const express = require('express');

const UserRoutes = require('./routes/user.route');
const AuthRoutes = require('./routes/auth.route');
const FriendRoutes = require('./routes/friend.route');

const app = express();

app.use(express.json());

app.use('/auth', AuthRoutes);
app.use('/users', UserRoutes);
app.use('/friends', FriendRoutes);

module.exports = app;
