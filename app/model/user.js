const mongoose = require('mongoose');
var schema = mongoose.Schema;

// defining the mongodb schema
var userSchema = new schema({                                  
    firstName: {
        type: String,
        require: [true, "First Name can't be Empty"],
        trim: true
    },

    lastName: {
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
var userModel =  mongoose.model('User', userSchema);  

class UserModelClass {
  findOne(findData, callback) {
    userModel.findOne(findData, (err, data) => {
      if (err) {
        console.log("ERROR in findOne :: " + err);
        return callback(err, null);
      } else {
        console.log("Data in findOne :: " + data);
        return callback(null, data);
      }
    });
  }

  registerUser(registerData, callback) {   
    let newUser = new userModel({
      firstName: registerData.body.firstName,
      lastName: registerData.body.lastName,
      email: registerData.body.email,
      password: registerData.body.password
    });
    newUser.save((err, data) => {
      if (err) {           
        return callback(err, null);
      } else {
        return callback(null, data);
      }
    });
  }
}

module.exports = { userModel , UserModelClass}