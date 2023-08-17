const express = require('express');
const imageController = require('../controllers/imageController');
const imageUploader = require('../middleware/image-uploader');
const checkAuthMiddleware = require('../middleware/check-authentication');

const router = express.Router();

router.post('/uploads', checkAuthMiddleware.checkAuth, imageUploader.upload.single('image'), imageController.upload);
router.get('/image/:filename', imageController.getImage);


module.exports = router