const mongoose = require("mongoose");
const MONGODB_URL = process.env.MONGODB_URL;

function mongoConnect() {
    // connection to mongoose
    mongoose.connect(MONGODB_URL, { useNewUrlParser: true , useUnifiedTopology: true });

    // mongoose disconnected 
    mongoose.connection.on('disconnected',  () => {
        console.log("connection to mongoose Disconnected");
        process.exit();
    })

    // mongoose error
    mongoose.connection.on('error',  (err) => {
        console.log("ERROR in mongodb Connection", err)
        process.exit();
    })

    // mongoose connected 
    mongoose.connection.on("connected", () =>{
        console.log("Successfully connected to the database");
    })
}
module.exports = { mongoConnect }