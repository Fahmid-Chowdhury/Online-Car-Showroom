const express = require('express');
const userController = require('../controllers/userController');
const carController = require('../controllers/carController');
const router = express.Router();

router.post('/signup', userController.signUp);
router.post('/login', userController.login);
router.get('/allcars', carController.allCars);
router.get('/car', carController.listCars);
router.get('/comments', carController.listComments);
router.get('/commented', carController.userReview);
router.post('/addcomment', carController.addComment);
router.get('/getcar', carController.getCar);
router.post('/order', carController.orderCar);

module.exports = router;