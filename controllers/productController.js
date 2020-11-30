const bookModel = require('../models/detailModel');

exports.index = (req, res, next) => {
    // Get books from model
    const books = bookModel.list;
    // Pass data to view to display list of books
    res.render('product/list', {layout: 'main_layout', books});
};

exports.book = (req, res, next) => {
    //const item = req.body.book_id;
    // Get detailbooks from model
    const detailbooks = bookModel.list;

    const detail = detailbooks[parseInt(req.params.id)]; 

    // Pass data to view to display list of books
    res.render('detailBook/detail', {layout: 'detaillayout', detail});
};