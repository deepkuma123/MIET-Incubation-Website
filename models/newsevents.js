const mongoose = require('mongoose');

const NewsEvents = new mongoose.Schema({
  img: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const NewsEvent = mongoose.model('newsEvents', NewsEvents);

module.exports = NewsEvent;