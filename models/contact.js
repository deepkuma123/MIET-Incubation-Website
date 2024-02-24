const mongoose = require("mongoose");
const { Schema } = mongoose;

// Create mongoose schema for the contact form data
const contactSchema = new Schema(
  {
    name: String,
    email: String,
    telephone: String,
    subject: String,
    message: String,
  },
  {
    timestamps: true, // Add timestamps option
  }
);

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
