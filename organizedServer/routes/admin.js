const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();
const checkAuthMiddleware = require('../middleware/check-authentication');


router.post('/addcar', checkAuthMiddleware.checkAuth, adminController.addCar),
// router.post('/addmodel', checkAuthMiddleware.checkAuth),

module.exports = router;