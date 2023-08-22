const express = require('express');
const testDriveController = require('../controllers/testDriveController');
const router = express.Router();
const checkAuthMiddleware = require('../middleware/check-authentication');

router.post('/insert', checkAuthMiddleware.checkAuth, testDriveController.testDrive)
router.post('/adminlist', checkAuthMiddleware.checkAuth, testDriveController.testDriveList);
router.post('/userlist', checkAuthMiddleware.checkAuth, testDriveController.testDriveUserList);
router.post('/confirm', checkAuthMiddleware.checkAuth, testDriveController.confirmTestDrive);

module.exports = router;
