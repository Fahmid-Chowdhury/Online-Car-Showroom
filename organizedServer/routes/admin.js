const express = require('express');
const adminController = require('../controllers/adminController');
const carController = require('../controllers/carController');
const router = express.Router();
const checkAuthMiddleware = require('../middleware/check-authentication');


router.post('/addcar', checkAuthMiddleware.checkAuth, adminController.addCar),
router.delete('/deletecar', checkAuthMiddleware.checkAuth, carController.deleteCar),
router.get('/getorders', checkAuthMiddleware.checkAuth, adminController.getOrders),
router.post('/confirmorder', checkAuthMiddleware.checkAuth, adminController.confirmOrder),
router.post('/cancelorder', checkAuthMiddleware.checkAuth, adminController.cancelOrder),
router.get('/getpayments', checkAuthMiddleware.checkAuth, adminController.getPayments),
router.post('/confirmpayment', checkAuthMiddleware.checkAuth, adminController.confirmPayment),
router.get('/getprocessingorders', checkAuthMiddleware.checkAuth, adminController.getOrdersProcessing),
router.post('/confirmdelivery', checkAuthMiddleware.checkAuth, adminController.confirmDelivery),
router.get('/getcompletedorders', checkAuthMiddleware.checkAuth, adminController.getOrdersCompleted),

module.exports = router;