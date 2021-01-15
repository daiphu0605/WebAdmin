const express = require('express');
const router = express.Router();
const ordersController = require('../../controllers/api/ordersController');

/* GET list of books. */
router.get('/order-list', (req, res, next) => {
    console.log('router api');
    ordersController.Invoiceapi(req, res, next);
});

router.get('/page', (req, res, next) => {
    console.log('router api');
    ordersController.pageapi(req, res, next);
});


module.exports = router;