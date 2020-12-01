var express = require("express");
var router = express.Router();
var addBook=require('../controllers/addBookController')

router.get('/',(req,res,next)=>{
    res.render('detailBook/detail_add',{layout: 'layout_sign'});

})

router.post('/',(req,res,next)=>{
    addBook.addBook(req,res);
    console.log(req.body);
})

module.exports = router;