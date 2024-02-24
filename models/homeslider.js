const mongoose = require('mongoose');

const homeSliderSchema = new mongoose.Schema({
  place: { type: String, required: true },
  title: { type: String, required: true },
  title2: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  link: { type: String, required: true },
});

const HomeSlider = mongoose.model('HomeSlider', homeSliderSchema);

module.exports = HomeSlider;
