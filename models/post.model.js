const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    description: String,
    image: String,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
  },
  { timestamps: true },
);
module.exports = mongoose.model('Posts', PostSchema);
