const express = require('express');
const carController = require('../controllers/carController');
const router = express.Router();

router.get('/brands', carController.availableBrands),
router.get('/years', carController.availableYears),
router.get('/maxprice', carController.maxPrice),

module.exports = router;