const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
app.use(cors())
const userRoute = require('./routes/user')

app.use(bodyParser.json());

app.use('/user', userRoute)

module.exports = app