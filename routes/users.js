var express = require('express');
var router = express.Router();
var userController= require('../controllers/userController')
/* GET users listing. */
router.get('/', userController.UserCon);
router.get('/delete', userController.UserCon);
router.get('/:id', userController.CreateNew);
router.get('/create-user', userController.CreateNew);

router.post('/delete', userController.UserDelPost);
router.post('/create-user', userController.CreateNew);

module.exports = router;
