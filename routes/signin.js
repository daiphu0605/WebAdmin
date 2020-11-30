var express = require('express');
var router = express.Router();
var signIn = require('../controllers/signIn')

router.get('/', (req, res, next) => {
    res.render('sign_in', {layout: 'layout_sign'});
});

router.post('/', (req, res) => {
    if (signIn.SignIn(req,res))
    {
         res.redirect('/');
    }
});

module.exports = router;