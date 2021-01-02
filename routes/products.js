const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

/* GET home page. */

router.get('/', productController.ProductCon);
router.get('/create-new', productController.CreateNew);
router.get('/delete', productController.ProductDel);
//router.get('/:id', productController.book);

module.exports = router;