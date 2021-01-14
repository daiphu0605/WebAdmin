let passport = require('passport')
let LocalStrategy = require('passport-local').Strategy;
let account = require('../models/accounts');

passport.use('SignIn',new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
},
  function(req, username, password, done) {
    account.SignIn(username,password,function(err,user,info){
      return done(err,user,info);
    });
  }
));

passport.serializeUser(function(user, done) {
    done(null, user.username);
  });
  
  passport.deserializeUser(function(username, done) {
    account.getUserByName(username,function(err,user,info){
      return done(err,user,info);
    });
  });

module.exports = passport;