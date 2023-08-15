const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
app.use(cors())
const userRoute = require('./routes/user')
const adminRoute = require('./routes/admin')
const imageRoute = require('./routes/images')

app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'))

app.use('/user', userRoute)
app.use('/admin', adminRoute)
app.use('/images', imageRoute)

module.exports = app