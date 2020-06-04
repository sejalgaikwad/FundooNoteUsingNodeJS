const jwt = require("jsonwebtoken");

module.exports = {
    tokenGeneration(payload) {
        try {
            var token = jwt.sign(payload, process.env.SECRETKEY,{ expiresIn: "60d" });//, { expiresIn: "60d" }
            return token;
        } catch (err) {
            console.log(err);
            return err;
        }
    }
};