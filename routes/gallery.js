const express = require('express');
const router = express.Router();
const multer = require('multer')
const gallery = multer({dest: 'uploads/'})
const fs = require('fs');
const Gallery = require('../models/gallery');

router.post('/gallery',gallery.single('file'), async (req, res) => {
  
    const {originalname,path} =req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length -1];
    const newPath = path+'.'+ ext
    fs.renameSync(path, newPath); 
     const {desc} =req.body
    const gallery = await Gallery.create({
        desc,
        img:newPath,
      })
      res.json(gallery);
})

// GET route to retrieve all gallery images
router.get('/gallery', async (req, res) => {
    try {
      const galleryImages = await Gallery.find().sort({ _id: -1 });
      res.json(galleryImages);
    } catch (error) {
      console.error('Error fetching gallery images:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router