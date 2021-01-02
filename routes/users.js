var express = require('express');
var router = express.Router();
var userController= require('../controllers/userController')
/* GET users listing. */
router.get('/', userController.UserCon);
router.get('/:id', userController.CreateNew);
router.get('/create-user', userController.CreateNew);

module.exports = router;
