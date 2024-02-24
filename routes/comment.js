// routes/comments.js

const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');




// Create comment
router.post('/comments', async (req, res) => {
  try {
    const { content, blogId } = req.body;

    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: 'Unauthorized: User is not logged in' });
    }

    const newComment = new Comment({
      content,
      author: req.user._id,
      authorType: req.user.isAdmin ? 'Admin' : 'User', // Assuming isAdmin is a property that indicates whether the user is an admin or not
      blogId,
    });

    const savedComment = await newComment.save();

    res.status(201).json(savedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get comments for a blog
router.get('/comments/:blogId', async (req, res) => {
  try {
    const blogId = req.params.blogId;

    const comments = await Comment.find({ blogId }).populate('author');

    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a comment
router.delete('/comments/:commentId',async (req, res) => {
    console.log('Is Authenticated:', req.user);

    try {
      const commentId = req.params.commentId;
      
      if (!req.isAuthenticated()) {
        return res.status(401).json({ error: 'Unauthorized: User is not logged in' });
      }
      // Check if the comment exists
      const existingComment = await Comment.findById(commentId);
  
      if (!existingComment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
  
      // Check if the user making the request is the author of the comment or is an admin
      if (
        req.user.isAdmin ||             // Admins can delete any comment
        existingComment.author.equals(req.user._id)  // Users can delete their own comments
      ) {
        // Delete the comment
        await Comment.findByIdAndDelete(commentId);
  
        res.status(200).json({ message: 'Comment deleted successfully' });
      } else {
        // User is not authorized to delete this comment
        res.status(403).json({ error: 'Unauthorized: You do not have permission to delete this comment' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
// Other routes for updating and deleting comments can be added similarly
// Don't forget to add authentication and authorization checks
module.exports = router;
