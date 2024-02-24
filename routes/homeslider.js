var express = require('express');
var router = express.Router();
const multer = require('multer')
const upload = multer({dest: 'uploads/'});
const HomeSlider = require('../models/homeslider');
const fs = require('fs');


router.get('/homeSlider', async (req,res) => {
    try {
        const homeSlider = await HomeSlider.find().sort({ _id: -1 });
        res.json(homeSlider);
      } catch (error) {
        console.error('Error retrieving blog posts:', error);
    
        // Check for specific error types and handle them accordingly
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
          // Handle cast error (e.g., invalid ObjectId)
          res.status(400).json({ error: 'Invalid ObjectId in request' });
        } else {
          // Handle other errors with a generic 500 response
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
})



router.post('/homeSlider', upload.single('file'), async (req, res) => {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = `${path}.${ext}`;
    fs.renameSync(path, newPath);
  
    const { title, description, place, title2, link } = req.body;
  
    try {
      const homeslider = await HomeSlider.create({
        image: newPath,
        title,
        description,
        place,
        title2,
        link,
      });
      res.json(homeslider);
    } catch (error) {
      console.error('Error creating destination:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


module.exports = router