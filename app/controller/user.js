const userService = require('../service/user')
const userServiceObjet = new userService.UserServiceClass();

class UserContollerClass{
    registerUser(registerData, res){ 
        registerData.checkBody('firstName', 'firstName is not valid').isLength({min: 3}).isAlpha().notEmpty();
        registerData.checkBody('lastName', 'lastName is not valid').isLength({min: 1}).isAlpha().notEmpty();
        registerData.checkBody('email', 'email is not valid').isEmail().notEmpty();
        registerData.checkBody('password', 'password is not valid').isLength({min: 8}).equals(registerData.body.password).notEmpty();
        var errors = registerData.validationErrors();
        var response = {}
        if (errors) {
            response.success = 'false',
            response.error = errors;
            return res.status(422).send(response);
        } else {
            userServiceObjet.registerUser(registerData, (err,data)=>{
                if (err) {
                    return res.status(500).send({ message: err })
                } else {
                    response.success = true;
                    response.result = data;
                    response.message = 'Register Successfully'               
                    return res.status(200).send({response})
                }
            })
        }
    }
}
module.exports = new UserContollerClass();