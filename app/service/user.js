const bcrypt = require('bcryptjs')
const userModel = require('../model/user')
const userModelObjet = new userModel.UserModelClass();

class UserServiceClass{
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
    
    verifyUser(body,decoded, callback){
        userModelObjet.updateData( {'_id':decoded._id }, {$set: { isVerified: true  }}, (err,data)=>{
            if(err){
                return callback (err)
            }else{
                return callback (null,data)
            }
        })
    }

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

    resetPassword(body,decoded, callback){
        userModelObjet.updateData({'_id': decoded.user_id }, {$set: {  password: body.newPassword}
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