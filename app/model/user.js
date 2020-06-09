/******************************************************************************
 *  @description    : Model is basically a wrapper around the schema, which 
 *                    allows us to actually interface with the database in order
 *                    to create, delete, update and read document,
 *  @file           : user.js
 *  @since          : 04-06-2020
 ******************************************************************************/

const bcryptPassword=require('../../utility/bcryptPassword')
const mongoose = require('mongoose');
var schema = mongoose.Schema;

// defining the mongoose schema
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
var userModel =  mongoose.model('User', userSchema);  // mongoose compiles model

class UserModelClass {

/***********************************************************************************
* @description:     findOne() method returns only one documents that satisfies the 
*                   criteria entered
* @param {object}   findData
* @param {object}   callback
*************************************************************************************/

  findOne(findData, callback) {
    userModel.findOne(findData, (err, data) => {
      if (err) {
        return callback(err, null);
      } else {
        return callback(null, data);
      }
    });
  }

/*************************************************************************************
* @description:     The save() method is designed to insert documents by calling the 
*                   instance of that document, meaning the model that has been created
* @param {object}   registerData
* @param {object}   callback
***************************************************************************************/

  registerUser(registerData, callback) {   
    var hashPassword=bcryptPassword.hashFunction(registerData.body.password)
    let newUser = new userModel({
      firstName: registerData.body.firstName,
      lastName: registerData.body.lastName,
      email: registerData.body.email,
      password: hashPassword
    });
    newUser.save((err, data) => {
      if (err) {           
        return callback(err, null);
      } else {
        return callback(null, data);
      }
    });
  }

/*************************************************************************************
* @description:     findByIdAndUpdate() finds the first document that matches a given 
*                   filter, applies an update, and returns the document.
* @param {object}   body
* @param {object}   decoded
* @param {object}   callback
***************************************************************************************/

  updateData  (body, decoded, callback)  {       
    userModel.findByIdAndUpdate(body,decoded, (err, data) => {
        if (err) {
            return callback(err)
        } else {            
            return callback(null, data)
        }
    })
  }
}

module.exports = { userModel , UserModelClass}