/***************************************************************************************
 *  @description    : Routing refers to determining how an application responds to a client 
 *                    request to a particular endpoint, which is a URI (or path) and 
 *                    a specific HTTP request method (GET, POST, and so on).
 *  @file           : route.js
 *  @since          : 04-06-2020
 *****************************************************************************************/
const express = require('express');
const routes = express.Router();

const userController = require('../controller/user');
const noteController = require('../controller/note')
const labelController = require('../controller/label')
const tokenVerify = require ('../../utility/tokenVerification');

routes.post("/register", userController.registerUser );
routes.post("/verifyUser",tokenVerify.tokenVerification,userController.verifyUser);
routes.post("/login", userController.loginUser );
routes.post("/forgotPassword",userController.forgotPassword);
routes.post("/resetPassword",tokenVerify.tokenVerification,userController.resetPassword);

routes.post("/createNote", tokenVerify.tokenVerification, noteController.createNote);
routes.post("/note/:noteId",tokenVerify.tokenVerification, noteController.updateNote);
routes.get("/getAllNotes",tokenVerify.tokenVerification,noteController.getAllNotes);
routes.get("/getAllTrashNotes",tokenVerify.tokenVerification,noteController.getAllTrashNotes);
routes.get("/getAllArchiveNotes",tokenVerify.tokenVerification,noteController.getAllArchiveNotes);
routes.get("/search",tokenVerify.tokenVerification,noteController.search);
routes.post("/addCollaborator/:noteId",tokenVerify.tokenVerification,noteController.addCollaborator);
routes.post("/removeCollaborator/:noteId",tokenVerify.tokenVerification,noteController.removeCollaborator);
routes.post("/addLabel/:noteId",tokenVerify.tokenVerification,noteController.addLabel);
routes.post("/removeLabel/:noteId",tokenVerify.tokenVerification,noteController.removeLabel);
routes.post("/addReminder/:noteId",tokenVerify.tokenVerification,noteController.addReminder);
routes.delete("/removeReminder/:noteId",tokenVerify.tokenVerification,noteController.removeReminder);

routes.post("/createLabel", tokenVerify.tokenVerification, labelController.createLabel);
routes.post("/label/:labelId",tokenVerify.tokenVerification, labelController.updateLabel);
routes.delete("/label/:labelId",tokenVerify.tokenVerification, labelController.removeLabel);
routes.get("/getAllLabels",tokenVerify.tokenVerification, labelController.getAllLabels);

module.exports = routes;