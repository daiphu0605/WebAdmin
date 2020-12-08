var express = require('express');
var router = express.Router();
var signIn = require('../controllers/signIn')

router.get('/',signIn.index);

router.post('/',signIn.SignIn);

module.exports = router;