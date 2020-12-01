var modelBook = require("../models/addBook");

exports.addBook = (req, res) => {
  if (modelBook(req, res));
  res.render('add_book_fin', { layout: 'layout_sign' });
};
