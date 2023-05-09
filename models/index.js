const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require('./user.model');
db.friend = require('./friend.model');
db.post = require('./post.model');

module.exports = db;
