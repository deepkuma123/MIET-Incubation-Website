var express = require('express');
var router = express.Router();
const multer = require('multer')
const upload = multer({dest: 'uploads/'});
const sliderItem = require('../models/sliderItem');
const fs = require('fs');


router.get('/sliderItem', async (req,res) => {
    try {
        const sliderItems = await sliderItem.find().sort({ _id: -1 });
        res.json(sliderItems);
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


router.post('/sliderItem', upload.single('file'), async (req, res) => {
    const {originalname,path} =req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length -1];
    const newPath = path+'.'+ ext
    fs.renameSync(path, newPath); 

    const {title, description} =req.body;
    const slider = await sliderItem.create({
        image: newPath,
        title,
        description
    })
    res.json(slider);

})


module.exports = router