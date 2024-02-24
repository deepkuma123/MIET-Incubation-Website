var express = require('express');
var router = express.Router();

const ApplicationModel = require('../models/multi_form'); // Import your Mongoose model


// Define a GET endpoint to retrieve all documents
router.get('/applications', async (req, res) => {
    try {
      // Retrieve all documents from the collection
      const applications = await ApplicationModel.find();
  
      // Respond with the retrieved documents
      res.status(200).json(applications);
    } catch (error) {
      console.error('Error retrieving applications:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// POST endpoint to save data to MongoDB
router.post('/applications', async (req, res) => {
  try {
    // Create a new document using the ApplicationModel
    const newApplication = new ApplicationModel(req.body);

    // Save the document to MongoDB
    const savedApplication = await newApplication.save();

    // Send a success response with the saved document
    res.status(201).json(savedApplication);
  } catch (error) {
    // Handle errors
    console.error('Error saving application:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;
