const express = require('express');
const router = express.Router();
const multer = require('multer')
const upload = multer({dest: 'uploads/'})
const BlogPost = require('../models/blog');
const fs = require('fs')

const checkAuthentication = (req, res, next) => {
  console.log(req.session.passport.user)
  if (req.isAuthenticated() && req.user.isAdmin) {
    console.log('User is authenticated');
    return next();
  } else {
    console.log('User is not authenticated');
    return res.status(401).json({ message: 'Unauthorized' });
  }

};
  


router.get(`/edit/:id`, checkAuthentication,async (req,res) =>{
  res.json(await BlogPost.findById(id))
})

// Route to get all blog posts (requires authentication)
router.get('/blogs', checkAuthentication, async (req, res) => {
  // Ensure that the user is authenticated before accessing req.user
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Unauthorized: User is not logged in' });
  }
  try {
    const blogPosts = await BlogPost.find().populate('author', ['username']);
    res.json(blogPosts);
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
});
// Route to get all blog posts (requires authentication)
router.get('/blogUser', async (req, res) => {
 
  try {
    const blogPosts = await BlogPost.find().populate('author', ['username']);
    res.json(blogPosts);
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
});

  router.get('/blog/:id',  async (req, res) => {
    try {
      const id = req.params.id;
      const PostDoc = await BlogPost.findById(id).populate('author', ['username']);
  
      // console.log(req.user._id);
  
      res.json(PostDoc);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  // Route to create a new blog post
router.post('/blogs', checkAuthentication,upload.single('file'), async (req, res) => {
  
  console.log(req.user._id);
  const {originalname,path} =req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length -1];
  const newPath = path+'.'+ ext
  fs.renameSync(path, newPath); 

  

  
  const {title, summary, content} =req.body;
  const postDoc = await BlogPost.create({
    title,
    summary,
    content,
    cover:newPath,
    author:req.user._id,
  })

  
  res.json(postDoc)
  
});


router.put('/blog/:id',upload.single('file'), async (req,res) =>{
  const id = req.params.id;
  let newPath = null;
  // res.json({files: req.file})
  if(req.file){
    const {originalname,path} =req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length -1];
    newPath = path+'.'+ ext
    fs.renameSync(path, newPath); 
  }
  // res.json(req.file)
  
  
  const { title, summary, content, author } = req.body;  
  const postDoc = await BlogPost.findById(id);
  console.log('postDoc.author.id:', postDoc.author.id);
  console.log('req.user._id:', req.user._id);
  const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(req.user._id);
  // res.json({postDoc ,req: req.user._id,isAuthor});
  if(!isAuthor){
    return res.status(400).json("you are not the author of this post just get lost");
  }
// Use findByIdAndUpdate to update the document
const updatedPost = await BlogPost.findByIdAndUpdate(
  id,
  {
    title,
    summary,
    content,
    cover: newPath ? newPath : postDoc.cover,
  },
  { new: true } // This option returns the updated document
);

res.status(200).json({ message: 'Blog post updated successfully' });
});
router.delete('/delete/:id',upload.single('file'), async (req,res) =>{
  const id = req.params.id;
const deleted = await BlogPost.findByIdAndDelete(id);

res.json(deleted);
});
  
  module.exports = router;
