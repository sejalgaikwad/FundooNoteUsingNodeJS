const bcrypt = require("bcryptjs");

 exports.hashFunction=(password)=> {
    const salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
  }

