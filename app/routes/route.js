const express = require('express');
const routes = express.Router();

const userController = require('../controller/user')
const tokenVerify = require ('../../utility/tokenVerification')

routes.post("/register", userController.registerUser );
routes.post("/verifyUser",tokenVerify.tokenVerification,userController.verifyUser);

module.exports = routes;

