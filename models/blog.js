const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
    title:String,
    summary:String,
    content:String,
    cover:String,
    author:{
        type:mongoose.Schema.Types.ObjectId,
         ref:'Admin'
        }
},{
   timestamps:true, 
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;
