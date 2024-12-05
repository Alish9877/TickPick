const mongoose = require('mongoose');

const commintSchema = new mongoose.Schema({
  discription: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  },
}, {
  timestamps: true // createdAt and updatedAt
});

const Comment = mongoose.model("Comment", commintSchema);
module.exports = Comment;