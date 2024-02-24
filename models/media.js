const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
  img: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Media = mongoose.model('media', MediaSchema);

module.exports = Media;