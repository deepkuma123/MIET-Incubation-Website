var express = require("express");
const Contact = require("../models/contact");
var router = express.Router();

router.get("/contact-form-data", async (req, res) => {
  try {
    const contactFormData = await Contact.find().sort({ createdAt: -1 }); // Retrieve contact form data sorted by createdAt timestamp
    res.status(200).json(contactFormData);
  } catch (error) {
    console.error("Error retrieving contact form data:", error);
    res.status(500).send("Failed to retrieve contact form data");
  }
});

module.exports = router;
