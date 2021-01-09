const express = require('express');
const router = express.Router();
const productController = require('../../controllers/api/productController');

/* GET list of books. */
router.get('/book-list', (req, res, next) => {
    productController.bookapi(req, res, next);
});

router.get('/page', (req, res, next) => {
    productController.pageapi(req, res, next);
});

/* GET list of books. */
router.get('/book-list-old', (req, res, next) => {
    productController.oldbookapi(req, res, next);
});

module.exports = router;