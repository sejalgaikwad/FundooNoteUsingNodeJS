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
app.listen(port, () => console.log(`Fundoo Notes app listening at http://localhost:${port}`))

