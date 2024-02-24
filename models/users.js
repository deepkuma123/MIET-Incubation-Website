const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

mongoose.connect("mongodb://localhost:27017/incubation");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String },
    email: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean, default: false },  // Add this line to indicate admin status
   // Add other user-related fields as needed
});

userSchema.plugin(plm);

const User = mongoose.model('User', userSchema);

module.exports = User;
