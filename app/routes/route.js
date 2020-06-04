const express = require('express');
const routes = express.Router();

const userController = require('../controller/user')

routes.post("/register", userController.registerUser );

module.exports = routes;

