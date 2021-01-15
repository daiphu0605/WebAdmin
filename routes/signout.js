const express = require('express');
const router = express.Router();
let passport = require('passport');

router.get('/', (req, res, next) => {
    if (typeof req.user === "undefined"){ 
        return res.redirect("/signin");
      }
    req.logout();
     res.redirect('/');
})

module.exports = router;