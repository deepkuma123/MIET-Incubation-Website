const express = require('express');
const router = express.Router();
const startUp = require('../models/incubite')


router.get('/api/startups/:status', async (req, res) => {
    const status = req.params.status;
  
    try {
        const startups = await startUp.find({ status: new RegExp(status, 'i') }).exec();
  
      res.status(200).json(startups);
    } catch (error) {
      console.error('Error fetching startups:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Define a POST endpoint for creating a new startup
router.post('/api/startups', (req, res) => {
    const {
      startupName,
      registrationNumber,
      website,
      dateOfAssociation,
      authorizedPerson,
      status,
      dateOfGraduation,
      startupOperational,
      description,
    } = req.body;
  
    const newStartup = new startUp({
      startupName,
      registrationNumber,
      website,
      dateOfAssociation: new Date(dateOfAssociation),
      authorizedPerson,
      status,
      dateOfGraduation: dateOfGraduation ? new Date(dateOfGraduation) : undefined,
      startupOperational: startupOperational || true,
      description,
    });
  
    newStartup.save()
      .then(() => {
        res.status(201).json({ message: 'Startup created successfully' });
      })
      .catch((error) => {
        console.error('Error creating startup:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });

  module.exports = router;
