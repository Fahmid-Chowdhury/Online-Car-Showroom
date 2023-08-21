const express = require('express');
const router = express.Router();
const checkAuthMiddleware = require('../middleware/check-authentication');
const enquiryController = require('../controllers/enquiryController');

router.post('/submitenquiry', checkAuthMiddleware.checkAuth, enquiryController.enquiry)
router.post('/updateEnquiry', checkAuthMiddleware.checkAuth, enquiryController.updateEnquiry)
router.post('/getEnquiry', checkAuthMiddleware.checkAuth, enquiryController.getAllEnquiries)
router.post('/response', checkAuthMiddleware.checkAuth, enquiryController.response)

module.exports = router;
