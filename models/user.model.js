const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  profilePicture: String,
  studyAt: String,
  city: String,
  age: {
    type: Number,
    min: 1,
  },
  friends: [],
  requests: [],
});

module.exports = mongoose.model('Users', UserSchema);
