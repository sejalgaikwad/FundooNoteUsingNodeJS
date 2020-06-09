/******************************************************************************
 *  @Execution       : 1. default node              cmd> node server.js
 *                     2. if nodemon installed      cmd> nodemon server.js
 *  @Purpose         : Fundoo-Notes APP backend server
 *  @description     : It provides the interaction between users and your application.
 *  @file            : server.js
 *  @author          : Sejal Gaikwad
 *  @version         : npm - 6.4.1      node - v10.15.3
 *  @since           : 04-06-2020
 ******************************************************************************/

require('dotenv').config();
require('./config/mongoDB').mongoConnect();

const express = require('express');
const bodyParser = require("body-parser");
var expressValidator= require('express-validator')
const routes = require('./app/routes/route')

const port = process.env.PORT
const app = express()

app.use(expressValidator());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", routes);
app.get('/', (req, res) => res.send('Welcome to Fundoo Notes!'))
app.listen(port, () => console.log(`Fundoo Notes app listening at http://localhost:${port}`));