const express = require('express');
const userController = require('../controllers/userController');
const carController = require('../controllers/carController');
const router = express.Router();
const checkAuthMiddleware = require('../middleware/check-authentication');

router.post('/signup', userController.signUp);
router.post('/login', userController.login);
router.get('/profile/:userId', userController.userProfile);
router.get('/allcars', carController.allCars);
router.post('/car', carController.listCars);
router.get('/comments', carController.listComments);
router.get('/commented', carController.userReview);
router.post('/addcomment', carController.addComment);
router.get('/getcar', carController.getCar);
router.post('/order', carController.orderCar);
router.patch('/nameUpdate', checkAuthMiddleware.checkAuth, userController.userNameUpdate);
router.patch('/emailUpdate', checkAuthMiddleware.checkAuth, userController.userEmailUpdate);
router.patch('/phoneUpdate', checkAuthMiddleware.checkAuth, userController.userPhoneUpdate);
router.patch('/addressUpdate', checkAuthMiddleware.checkAuth, userController.userAddressUpdate);
router.patch('/passwordUpdate', checkAuthMiddleware.checkAuth, userController.passwordUpdate);
router.post('/orderretrieve', checkAuthMiddleware.checkAuth, userController.orderRetrieve);

module.exports = router;
