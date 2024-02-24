const mongoose = require('mongoose');

// Define the schema for the slider data
const sliderSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true }
});

// Create the Mongoose model
const Slider = mongoose.model('Slider', sliderSchema);

// Export the model
module.exports = Slider;
