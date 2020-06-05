const express = require('express');
const routes = express.Router();

const userController = require('../controller/user')
const tokenVerify = require ('../../utility/tokenVerification')

routes.post("/register", userController.registerUser );
routes.post("/verifyUser",tokenVerify.tokenVerification,userController.verifyUser);
routes.post("/login", userController.loginUser );
routes.post("/forgotPassword",userController.forgotPassword)

module.exports = routes;

