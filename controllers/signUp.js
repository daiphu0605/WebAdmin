//const account = require('../models/account');
const express = require('express');

    exports.SignUp = (req, res) => {
        var username = req.body.username;
        var password = req.body.pass;
        var repassword = req.body.repass;
        var ErrorUsername ="";
        var ErrorConfirmPassword = "";
    
        if (repassword !== password) {
            ErrorConfirmPassword = ErrorConfirmPassword + "Password is not matching.\n";
        }
    
        if (ErrorConfirmPassword.length != 0 || ErrorUsername.length != 0) {
            res.render('sign_up', { layout: 'layout_sign', username, ErrorUsername, ErrorConfirmPassword });
        }
        else {
            res.render('sign_up_fin', { layout: 'layout_sign' });
        }
    }


