const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema(
  {
    requester: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    status: {
      type: String,
      enum: ['requested', 'added'],
      default: 'requested',
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model('Friends', FriendSchema);
