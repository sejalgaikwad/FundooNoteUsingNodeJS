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
}

module.exports = { UserServiceClass }