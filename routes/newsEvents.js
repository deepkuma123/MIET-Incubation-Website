const express = require('express');
const router = express.Router();
const multer = require('multer')
const gallery = multer({dest: 'uploads/'})
const fs = require('fs');
const NewsEvent = require('../models/newsevents');
const { timeStamp } = require('console');

router.post('/newsEvent',gallery.single('file'), async (req, res) => {
  
    const {originalname,path} =req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length -1];
    const newPath = path+'.'+ ext
    fs.renameSync(path, newPath); 
     const {desc} =req.body
    const newsEvent = await NewsEvent.create({
        desc,
        img:newPath,
      })
      res.json(newsEvent);
})

// GET route to retrieve all gallery images
router.get('/newsEvent', async (req, res) => {
    try {
      const galleryImages = await NewsEvent.find().sort({ _id: -1 });
      res.json(galleryImages);
    } catch (error) {
      console.error('Error fetching newsEvent images:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router