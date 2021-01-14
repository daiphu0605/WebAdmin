var account =require('../models/accounts')
let passport = require('./passport')

exports.SignIn = (req, res,next) => {
    passport.authenticate('SignIn', function(err, user, info) {
        if (err){ 
            return next(err);
        }
        if (!user){
            var Error;
            switch (into){
                case "Wrong_User":
                    Error = "Username is not existed."
                    break;
                case "Wrong_Pass":
                    Error = "Password is invalided."
                    break;
            }
            return res.render("sign_in",{layout: "layout_sign", Error})
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.redirect("/");
        });
    })
}
exports.index =async(req, res,next)=>{
    res.render('sign_in', {layout: 'layout_sign'});
}