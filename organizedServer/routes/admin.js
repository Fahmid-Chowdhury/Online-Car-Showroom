const express = require('express');
const adminController = require('../controllers/adminController');
const carController = require('../controllers/carController');
const router = express.Router();
const checkAuthMiddleware = require('../middleware/check-authentication');


router.post('/addcar', checkAuthMiddleware.checkAuth, adminController.addCar),
router.post('/deletecar', checkAuthMiddleware.checkAuth, carController.deleteCar),
// router.post('/addmodel', checkAuthMiddleware.checkAuth),

module.exports = router;