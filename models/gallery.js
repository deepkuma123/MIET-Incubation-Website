const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
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

const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = Gallery;