const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const adminSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String 
    },
    email: {
         type: String, 
         required: true, 
         unique: true 
        },
    isAdmin: { 
        type: Boolean,
         default: true 
        },  // Add this line to indicate admin status

    // Add other admin-related fields as needed
});

adminSchema.plugin(passportLocalMongoose);

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
