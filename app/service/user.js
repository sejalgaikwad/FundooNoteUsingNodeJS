/******************************************************************************
 *  @description    : The service layer contains business logic.
 *  @file           : user.js
 *  @since          : 04-06-2020
 ******************************************************************************/

const bcrypt =require ('bcryptjs')
const bcryptPassword=require('../../utility/bcryptPassword')
const userModel = require('../model/user')
const userModelObjet = new userModel.UserModelClass();

class UserServiceClass{

/***********************************************************************************
* @description:     The user registration API can be used to create user accounts 
*                   in the application if it is already exist throw error.
* @param {object}   registerData
* @param {object}   callback
*************************************************************************************/

    registerUser(registerData, callback){       
        const findData = { email: registerData.body.email };
        userModelObjet.findOne(findData, (err, data) => {
            if (data) {
                return callback("Email Already Registered..");
            } else if (data === null) {
                userModelObjet.registerUser(registerData, (err, data) => {
                    if (err) {   
                        return callback(err, null);
                    } else {
                        return callback(null, data);
                    }
                })
            } 
        })
    }

/***********************************************************************************
* @description:     verifyUser API for verifying valid user.
* @param {object}   body
* @param {object}   decoded
* @param {object}   callback
*************************************************************************************/

    verifyUser(body,decoded, callback){
        userModelObjet.updateData( {'_id':decoded._id }, {$set: { isVerified: true  }}, (err,data)=>{
            if(err){
                return callback (err)
            }else{
                return callback (null,data)
            }
        })
    }

/***********************************************************************************
* @description: The user Login API can be used to login user in the application using 
                email, password.
* @param {object} loginData
* @param {object} callback
*************************************************************************************/

    loginUser(loginData, callback) {
        userModelObjet.findOne({ email: loginData.email }, (err, data) => {
            if (data == null) {
              return callback({ message: "invalid email" }, null);
            } else if (err) {
              return callback(err, null);
            } else {
              if (data.isVerified == false) {
                return callback(null, "not verified");
                } else {
                    bcrypt.compare(loginData.password, data.password, (err, res) => {
                        if (res) {
                            return callback(null, data);
                        } else {
                            return callback("Invalid Password", null);
                        }
                    });
                }
            }
        });
    }

/***********************************************************************************
* @description: The Forgot Password API can be used when user forgot the password.
* @param {object} userData
* @param {object} callback
*************************************************************************************/

    forgotPassword  (userData, callback)  {
        userModelObjet.findOne({'email': userData.email}, (err, data) => {
            if (err) {
                return callback(err)
            } else if (data) {
                return callback(null, data)
            } else {
                return callback("Invalid User")
            }
        })
    }

/***********************************************************************************
* @description: The Reset Password API can be used to set a new password.
* @param {object} body
* @param {object} decoded
* @param {object} callback
*************************************************************************************/

    resetPassword(body,decoded, callback){
        var hashPassword=bcryptPassword.hashFunction(body.newPassword)
        userModelObjet.updateData({'_id': decoded.user_id }, {$set: {  password: hashPassword}
        }, (err,data)=>{
            if(err){
                return callback (err)
            }else{
                return callback (null,data)
            }
        })
    }
}
    
module.exports = { UserServiceClass }