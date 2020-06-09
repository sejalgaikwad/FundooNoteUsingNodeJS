/*****************************************************************************************
 *  @description    : Verifying token to change password of valid user using jwt.verify()
 *  @file           : tokenVerification.js
 *  @since          : 05-06-2020
 ******************************************************************************************/
var jwt = require('jsonwebtoken');
var SECRETKEY = process.env.SECRETKEY

exports.tokenVerification = (req, res, next) => {
    var token = req.headers["token"] || req.params.token;
    response = {
        succes: false,
        message: "token not valid"
    }           
    if (token) {
        jwt.verify(token, SECRETKEY, (err, decoded) => {
            if (err) {
                return res.status(401).send({ response });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.send({
            succes: false,
            message: "token not provided"
        })
    }
}
