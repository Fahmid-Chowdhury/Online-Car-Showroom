const express = require('express');
const userController = require('../controllers/userController');
const carController = require('../controllers/carController');
const router = express.Router();

router.post('/signup', userController.signUp);
router.post('/login', userController.login);
router.get('/allcars', carController.allCars);

module.exports = router;