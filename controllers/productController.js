const productService = require("../models/productService");
const cloudinary = require("../utils/cloudinary");

var search = require("../models/search");

async function Search(req, res, next) {
  var value = req.query.searchproduct;
  var limit = 12;
  var page = 1;
  var Result = search.Search(value, page, limit);
  Result.then((searchResult) => {
    res.render("products/list", {
      layout: "main_layout",
      books: searchResult,
      page,
    });
  });
}

//
exports.ProductCon = (req, res, next) => {
  var value = req.query.searchproduct;
  if (value == null) {
    index(req, res, next);
  } else {
    Search(req, res, next);
  }
};
//
exports.ProductDel = (req, res, next) => {
  var value = req.query.searchproduct;
  if (value == null) {
    index(req, res, next);
  } else {
    Search(req, res, next);
  }
};

async function index(req, res, next) {
  //Get current page, default by 1
  const curPage = +req.query.page || 1;

  //Get catogoryID
  const catID = req.query.catogory || "";

  //Get Page infomation
  const page = await productService.pageNumber(curPage, catID);

  // Get books from model
  const books = await productService.products(curPage, catID);

  // Pass data to view to display list of books
  res.render("products/list", { layout: "main_layout", books, page });
}

exports.book = async (req, res, next) => {
  //const item = req.body.book_id;
  // Get detailbooks from model
  var BookID = req.params.id;
  const detail = await productService.getBookByID(BookID);

  res.render("detailBook/detail", { layout: "detaillayout", detail });
};

exports.CreateNewPage = async (req, res, next) => {
  //const item = req.body.book_id;
  // Get detailbooks from model
  res.render("products/create_new", { layout: "main_layout" });
};

exports.CreateNewPost = async (req, res, next) => {
  //const item = req.body.book_id;
  // Get detailbooks from model
  const result = await cloudinary.uploader.upload(req.file.path);
  const fs = require("fs");
  fs.unlinkSync(req.file.path);
  if (await productService.addNewProduct(req, res, result.url)){
      //Render success page + return
      console.log("fuck");
      index(req,res,next);
  }
    //Render errorpage
};


exports.ProductRemovePage = (req, res, next) => {
  index(req, res, next);
};

exports.ProductRemovePost = async (req, res, next) => {
  var result = [];
  for (var i in req.body) result.push(i);
  await productService.removeProducts(result);
  index(req, res, next);
};
