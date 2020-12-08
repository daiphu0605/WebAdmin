const bookModel = require('../models/productService');

exports.index = (req, res, next) => {
     //Get current page, default by 1
     const curPage = +req.query.page || 1;

     //Get catogoryID
     const catID = req.query.catogory || "";
 
 
     //Get Page infomation
     const page = await bookService.pageNumber(curPage, catID);
 
     // Get books from model
     const products = await bookService.products(curPage, catID);
 
     // Pass data to view to display list of books
     res.render('product/list', {layout: 'main_layout', products, page});
};

exports.book = (req, res, next) => {
    //const item = req.body.book_id;
    // Get detailbooks from model
    const detailbooks = bookModel.list;

    const detail = detailbooks[parseInt(req.params.id)]; 

    // Pass data to view to display list of books
    res.render('detailBook/detail', {layout: 'detaillayout', detail});
};