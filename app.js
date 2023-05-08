const express = require('express');

const UserRoutes = require('./routes/user.route');
const AuthRoutes = require('./routes/auth.route');

const app = express();

app.use(express.json());

app.use('/auth', AuthRoutes);
app.use('/user', UserRoutes);

module.exports = app;
