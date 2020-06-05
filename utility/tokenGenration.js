const jwt = require("jsonwebtoken");
const SECRETKEY = process.env.SECRETKEY;
module.exports = {
    tokenGeneration(payload) {
        try {
            var token = jwt.sign(payload, SECRETKEY ,{ expiresIn: "60d" });//, { expiresIn: "60d" }
            return token;
        } catch (err) {
            console.log(err);
            return err;
        }
    }
};