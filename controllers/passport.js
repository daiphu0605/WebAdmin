let passport = require('passport')
let LocalStrategy = require('passport-local').Strategy;
let account = require('../models/accounts');

passport.use('sign-in',new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
},
  function(req, username, password, done) {
    account.SignIn(username,password,done);
  }
));

passport.serializeUser(function(user, done) {
    done(null, user.username);
  });
  
  passport.deserializeUser(function(username, done) {
    account.getUserByName(username,done);
  });

module.exports = passport;