const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

/* GET home page. */

router.get('/', productController.ProductCon);
router.get('/create-new', productController.CreateNewPage);
router.get('/delete', productController.ProductRemovePage);
//router.get('/:id', productController.book);

router.post('/delete', productController.ProductRemovePost);

module.exports = router;