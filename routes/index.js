var express = require('express');
var router = express.Router();
const userModel = require('../models/users')
const adminModel = require('../models/admin');
const BlogPost = require('../models/blog');
const passport = require('passport');
const localStrategy = require('passport-local')
// passport.use(new localStrategy(userModel.authenticate()));
passport.use('local-user', new localStrategy(userModel.authenticate()));
passport.use('local-admin', new localStrategy(adminModel.authenticate()));


// API route for testing connection
router.get('/api/test', (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.json({ message: 'Server is connected to the React app.' });
});

router.post('/register',function(req,res){
    const {username,email} = req.body;
    const userData = new userModel({username,email});

    userModel.register(userData, req.body.password)
    .then(function() {
      passport.authenticate("local-user")(req, res, function() {
        console.log('User registered and authenticated successfully');
        res.json({ message: 'User created successfully' });
      });
    })
    .catch(function(error) {
      console.error('Error during user registration:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});


router.post('/login', passport.authenticate(['local-admin' ,'local-user' ]), (req, res) => {
  // If this function is called, authentication was successful.
  const { _id, username, email, isAdmin } = req.user;

  console.log(`${isAdmin ? 'Admin' : 'User'} login successful`);
  console.log('User details after login:', { _id, username, email, isAdmin });
  console.log('Session details after login:', req.session.passport.user);
  console.log('Entire session object after login:', req.session);


  res.json({
    message: `${isAdmin ? 'Admin' : 'User'} login successful`,
    user: { _id, username, email, isAdmin }
  });
});



router.get('/logout', function(req, res) {
  
  // Use the logout function and provide a callback
  req.logout(function(err) {
    if (err) {
      return res.status(500).json({ message: 'Internal Server Error during logout' });
    }
    // Redirect the user to the home page after successful logout
    console.log("logout")
    res.json({message:"user logout"})
  });
});

module.exports = router;
