const express = require('express');
const imageController = require('../controllers/image.Controller');
const imageUploader = require('../middleware/image-uploader');
const checkAuthMiddleware = require('../middleware/check-authentication');

const router = express.Router();

router.post('/uploads', checkAuthMiddleware.checkAuth, imageUploader.upload.single('image'), imageController.upload);

module.exports = router