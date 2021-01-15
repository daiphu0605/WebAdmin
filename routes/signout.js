const express = require('express');
const router = express.Router();
let passport = require('passport');

router.get('/', (req, res, next) => {
    req.logout();
     res.redirect('/');
})

module.exports = router;