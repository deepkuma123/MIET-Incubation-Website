// models/comment.js

const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'authorType', // Dynamic ref based on authorType field
  },
  authorType: {
    type: String,
    enum: ['Admin', 'User'], // Specify the possible values for authorType
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  // Add any other fields you might need, such as post reference
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BlogPost', 
  },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;