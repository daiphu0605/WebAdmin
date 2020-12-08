const express = require('express');
var account =require('../models/accounts')
var router = express.Router();
exports.SignIn = async (req, res,next) => {
    var username = req.body.username;
    var pass = req.body.pass;
    var Error = "";
    var status=await account.isAccount(username, pass)
    console.log(status);
    if (status)
    {
        res.redirect('/');
    }
    else {
        Error = Error + "Wrong Password or Username.\n";
        res.render ("sign_in", {layout: 'layout_sign', Error});
    }
}
exports.index =async(req, res,next)=>{
    res.render('sign_in', {layout: 'layout_sign'});
}