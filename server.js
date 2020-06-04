require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT

app.get('/', (req, res) => res.send('Welcome to Fundoo Notes!'))

app.listen(port, () => console.log(`Fundoo Notes app listening at http://localhost:${port}`))
