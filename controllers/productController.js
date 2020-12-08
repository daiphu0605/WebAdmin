const productService = require('../models/productService');

exports.index = async (req, res, next) => {
     //Get current page, default by 1
     const curPage = +req.query.page || 1;

     //Get catogoryID
     const catID = req.query.catogory || "";
 
 
     //Get Page infomation
     const page = await productService.pageNumber(curPage, catID);
 
     // Get books from model
     const books = await productService.products(curPage, catID);
 
     // Pass data to view to display list of books
     res.render('product/list', {layout: 'main_layout', books, page});
};

exports.book = async (req, res, next) => {
    //const item = req.body.book_id;
    // Get detailbooks from model
    var BookID = req.params.id;
    const detail = await productService.getBookByID(BookID);

    res.render('detailBook/detail', {layout: 'detaillayout', detail});
};