const express = require('express');

const UserRoutes = require('./routes/user.route');

const app = express();

app.use(express.json());

app.use('/user', UserRoutes);

module.exports = app;
