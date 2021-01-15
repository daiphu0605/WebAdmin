var express = require('express');
var router = express.Router();
const upload = require("../utils/multer");
var userController= require('../controllers/userController')
/* GET users listing. */
router.get('/', userController.UserCon);
router.get('/active', userController.UserActive);
router.get('/delete', userController.UserDel);
router.get('/create-new', userController.CreateNewPage);
router.get('/:id', userController.user);

router.post('/delete', userController.UserBlocklistPost);
router.post('/active', userController.UserActivePost);
router.post('/create-new',upload.single("avatar"), userController.CreateNewPost);

module.exports = router;
