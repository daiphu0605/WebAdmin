const express = require('express');
const router = express.Router();
const userController = require('../../controllers/api/userController');

/* GET list of books. */
router.get('/user-list', (req, res, next) => {
    console.log('Query in router api user');
    userController.userapi(req, res, next);
});

router.get('/page', (req, res, next) => {
    console.log('Query in router api');
    console.log(req.query);
    userController.pageapi(req, res, next);
});


module.exports = router;