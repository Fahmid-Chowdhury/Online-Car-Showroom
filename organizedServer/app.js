const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
app.use(cors())

const userRoute = require('./routes/user')
const adminRoute = require('./routes/admin')
const imageRoute = require('./routes/images')
const enquiryRoute = require('./routes/enquiry')
const testdriveRoute = require('./routes/testDrive')

app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'))

app.use('/user', userRoute)
app.use('/admin', adminRoute)
app.use('/images', imageRoute)
app.use('/enquiry', enquiryRoute)
app.use('/testdrive', testdriveRoute)

module.exports = app