var express = require('express');
var router = express.Router();
var signUp = require('../controllers/signUp')

router.get('/', (req, res, next) => {
    res.render('sign_up', {layout: 'layout_sign'});
});

router.post('/', (req, res) => {
    signUp.SignUp(req,res);
});

router.get('/', (req, res, next) => {
     res.redirect('/');;
});

module.exports = router;