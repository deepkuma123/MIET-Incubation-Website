var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const session = require('express-session'); // Correct import
const MongoStore = require('connect-mongo');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var commentRouter = require('./routes/comment');
var blogRouter = require('./routes/blog');
var incubitee = require('./routes/incubitee');
var gallery = require('./routes/gallery');
var newsEvent = require('./routes/newsEvents');
var media = require('./routes/media');
var MultiForm = require('./routes/multiForm');
var homeSlider = require('./routes/homeslider');
var sliderRouter = require('./routes/slider');
var userModel = require('./models/users');
var adminModel = require('./models/admin');
const passport = require('passport');
const mongoose = require('mongoose'); // Make sure to import mongoose
const multer = require('multer');
const nodemailer =require('nodemailer');
const Contact = require('./models/contact');
const contactForm = require('./routes/contact')

var app = express();


// Set up session store
const sessionStore = new MongoStore({
  mongoUrl: 'mongodb://127.0.0.1:27017/incubation', // Add your MongoDB URL
  // Other options if needed
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: "hello",
  // cookie: {
  //   sameSite: 'None',
  //   // secure: true, // Enable this if using HTTPS
  // },
    store: sessionStore, // Use your mongoose connection

}))

app.use(passport.initialize());
app.use(passport.session());

// Serialize and deserialize user for regular user strategy
passport.serializeUser(userModel.serializeUser());
// passport.deserializeUser(userModel.deserializeUser());

// Serialize and deserialize user for admin strategy
passport.serializeUser(adminModel.serializeUser());
// passport.deserializeUser(adminModel.deserializeUser());

// Custom deserialize function to handle both regular and admin users
passport.deserializeUser((id, done) => {
  // Try to deserialize as a regular user
  userModel.deserializeUser()(id, (err, user) => {
    if (user) {
      return done(err, user);
    }

    // If not a regular user, try to deserialize as an admin user
    adminModel.deserializeUser()(id, (err, admin) => {
      return done(err, admin);
    });
  });
});
// Assuming you have an admin model with Passport Local Mongoose

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const corsOptions = {
  credentials: true,
  origin: 'http://localhost:3001',
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use('/uploads',express.static(__dirname + '/uploads'));

app.use('/', indexRouter);
app.use('/', blogRouter);  
app.use('/', commentRouter);    
app.use('/', contactForm);    
app.use('/', incubitee);    
app.use('/', gallery);    
app.use('/', newsEvent);    
app.use('/', media);    
app.use('/', MultiForm);    
app.use('/', homeSlider);    
app.use('/', sliderRouter);
app.use('/', usersRouter);



app.post('/send-email', async (req, res) => {
  const { name, email, telephone, subject, message } = req.body;

   // Save contact form data to MongoDB
   try {
     await Contact.create({
       name,
       email,
       telephone,
       subject,
       message,
     });
   } catch (error) {
     console.error("Error saving contact form data to MongoDB:", error);
     res.status(500).send("Failed to save contact form data");
     return;
   }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'deepkuma3214@gmail.com', // Replace with your Gmail email
      pass: 'xate stly zxxj kcxn',   // Replace with your Gmail app password
    },
  });

  const mailOptions = {
    from: 'deepkuma3214@gmail.com',
    to: 'deepkuma3214@gmail.com', // Replace with the recipient's email
    subject: subject || 'No Subject',
    text: `Name: ${name}\nEmail: ${email}\nTelephone: ${telephone}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);

    // Step 2: Send confirmation email to the user
    const confirmationMailOptions = {
      from: 'deepkuma3214@gmail.com',
      to: email, // Use the user's email as the recipient for confirmation
      subject: 'Confirmation Email',
      text: `Hello ${name},\n\nThank you for contacting us. We have received your message and will get back to you as soon as possible.\n\nBest regards,\nThe Support Team`,
    };

    await transporter.sendMail(confirmationMailOptions);

    // Send the response after both emails have been sent successfully
    res.status(200).send('Emails sent successfully');
  } catch (error) {
    console.error('Error sending email', error);

    // Check if the error is related to an invalid email address
    if (error.message.includes('Invalid login')) {
      res.status(400).send('Invalid email address');
    } else {
      res.status(500).send('Failed to send email');
    }
  }
});

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Add a generic error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

module.exports = app;
