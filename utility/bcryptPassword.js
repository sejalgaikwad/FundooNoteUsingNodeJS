/*********************************************************************************************
 *  @description    : A quick way for hashing and comparing passwords using Bcrypt with Nodejs.
 *  @file           : bcryptPassword.js
 *  @since          : 04-06-2020
 ***********************************************************************************************/
const bcrypt = require("bcryptjs");

exports.hashFunction=(password)=> {
    const salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
  }

