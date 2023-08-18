const express = require('express');
const adminController = require('../controllers/adminController');
const carController = require('../controllers/carController');
const router = express.Router();
const checkAuthMiddleware = require('../middleware/check-authentication');


router.post('/addcar', checkAuthMiddleware.checkAuth, adminController.addCar),
router.delete('/deletecar', checkAuthMiddleware.checkAuth, carController.deleteCar),
router.get('/getorders', checkAuthMiddleware.checkAuth, adminController.getOrders),

module.exports = router;