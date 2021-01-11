var express = require('express');
var router = express.Router();
const upload = require("../utils/multer");
var userController= require('../controllers/userController')
/* GET users listing. */
router.get('/', userController.UserCon);
router.get('/delete', userController.UserCon);
router.get('/create-new', userController.CreateNewPage);
router.get('/:id', userController.user);

router.post('/delete', userController.UserDelPost);
router.post('/create-new',upload.single("avatar"), userController.CreateNewPost);

module.exports = router;
