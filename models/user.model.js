const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
  {
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
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Friends' }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Posts' }],
  },
  { timestamps: true },
);

module.exports = mongoose.model('Users', UserSchema);
