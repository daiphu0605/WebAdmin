const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const userController =require('../controllers/userController');

/* GET home page. */

router.get('/', productController.ProductCon);

//router.get('/:id', productController.book);

module.exports = router;
