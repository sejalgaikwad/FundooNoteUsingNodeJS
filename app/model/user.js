const mongoose = require('mongoose');
var schema = mongoose.Schema;

// defining the mongodb schema
var userSchema = new schema({                                  
    firstname: {
        type: String,
        require: [true, "First Name can't be Empty"],
        trim: true
    },

    lastname: {
        type: String,
        require: [true, "Last Name can't be Empty"],
        trim: true
    },

    email: {
        type: String,
        require: [true, "Email can't be Empty"],
        trim: true,
        lowercase: true,
        unique: [true, 'Email already exists'],
    },

    password: {
        type: String,
        require: [true, "Password can't be Empty"],
        trim: true
    },

    isVerified: {
        type: Boolean,
        default: false
    },
}, 
{
    timestamps: true
});
module.exports = mongoose.model('usermodel', userSchema);              

