var modelBook = require("../models/addBook");

exports.addBook = (req, res,image_url) => {
  console.log("Belo is route");
  console.log(image_url);
  if (modelBook(req, res,image_url));
  res.render('add_book_fin', { layout: 'layout_sign' });
};
