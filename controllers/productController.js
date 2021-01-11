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
  index(req, res, next);
};

exports.ProductDel = async (req, res, next) => {
  var result = [];
  for (var i in req.body) result.push(i);
  result.pop();
  await productService.removeProducts(result);
  res.redirect("/products");
};

async function index(req, res, next) {
  //Get current page, default by 1
  const curPage = +req.query.page || 1;

  //Get Search
  const search = req.query.search || "";

  //Get catogory
  const category = req.query.category || "";

  //Get Sort type
  const sort = req.query.sort || "";

  //Get price
  const price = req.query.price || "";

  //Get Supplier
  const supplier = req.query.supplier || "";

  //Get Author
  const author = req.query.author || "";

  //Get publisher
  const publisher = req.query.publisher || "";

  //Get Page infomation
  const page = await productService.pageNumber(
    curPage,
    search,
    category,
    price,
    author,
    publisher,
    supplier
  );
  console.log("This is page number");
  console.log(page);
  // Get books from model
  const books = await productService.getBooks(
    page.currentPage,
    search,
    category,
    sort,
    price,
    author,
    publisher,
    supplier
  );

  //get new url
  const categoryURL = await productService.getURL(
    search,
    category,
    sort,
    price,
    author,
    publisher,
    supplier,
    1
  );

  const defaultcategoryURL = categoryURL.substring(0, categoryURL.length - 1);

  const sortURL = await productService.getURL(
    search,
    category,
    sort,
    price,
    author,
    publisher,
    supplier,
    2
  );
  const defaultsortURL = sortURL.substring(0, sortURL.length - 1);

  const priceURL = await productService.getURL(
    search,
    category,
    sort,
    price,
    author,
    publisher,
    supplier,
    3
  );
  const defaultpriceURL = priceURL.substring(0, priceURL.length - 1);

  /*const authorURL = await bookService.getURL(category, sort, price, author, publisher, supplier, 4);
  const defaultauthorURL = authorURL.substring(0,authorURL.length-1);

  const publisherURL = await bookService.getURL(category, sort, price, author, publisher, supplier, 5);
  const defaultpublisherURL = publisherURL.substring(0,publisherURL.length-1);

  const supplierURL = await bookService.getURL(category, sort, price, author, publisher, supplier, 6);
  const defaultsupplierURL = supplierURL.substring(0,supplierURL.length-1);*/

  const sortCode = await productService.getSortCode(sort);
  const priceCode = await productService.getPriceCode(price);

  // Pass data to view to display list of books
  res.render("products/list", {
    layout: "main_layout",
    books,
    page,
    category,
    defaultcategoryURL,
    categoryURL,
    sort,
    sortCode,
    defaultsortURL,
    sortURL,
    price,
    priceCode,
    defaultpriceURL,
    priceURL,
    supplier,
    author,
    publisher,
    search,
  });
}

async function index_for_remove(req, res, next) {
  //Get current page, default by 1
  const curPage = +req.query.page || 1;

  //Get Search
  const search = req.query.search || "";

  //Get catogory
  const category = req.query.category || "";

  //Get Sort type
  const sort = req.query.sort || "";

  //Get price
  const price = req.query.price || "";

  //Get Supplier
  const supplier = req.query.supplier || "";

  //Get Author
  const author = req.query.author || "";

  //Get publisher
  const publisher = req.query.publisher || "";

  //Get Page infomation
  const page = await productService.pageNumber(
    curPage,
    search,
    category,
    price,
    author,
    publisher,
    supplier,
    "Block"
  );

  // Get books from model
  const books = await productService.getBooks(
    page.currentPage,
    search,
    category,
    sort,
    price,
    author,
    publisher,
    supplier,
    "Block"
  );

  //get new url
  const categoryURL = await productService.getURL(
    search,
    category,
    sort,
    price,
    author,
    publisher,
    supplier,
    1
  );

  const defaultcategoryURL = categoryURL.substring(0, categoryURL.length - 1);

  const sortURL = await productService.getURL(
    search,
    category,
    sort,
    price,
    author,
    publisher,
    supplier,
    2
  );
  const defaultsortURL = sortURL.substring(0, sortURL.length - 1);

  const priceURL = await productService.getURL(
    search,
    category,
    sort,
    price,
    author,
    publisher,
    supplier,
    3
  );
  const defaultpriceURL = priceURL.substring(0, priceURL.length - 1);

  /*const authorURL = await bookService.getURL(category, sort, price, author, publisher, supplier, 4);
  const defaultauthorURL = authorURL.substring(0,authorURL.length-1);

  const publisherURL = await bookService.getURL(category, sort, price, author, publisher, supplier, 5);
  const defaultpublisherURL = publisherURL.substring(0,publisherURL.length-1);

  const supplierURL = await bookService.getURL(category, sort, price, author, publisher, supplier, 6);
  const defaultsupplierURL = supplierURL.substring(0,supplierURL.length-1);*/

  const sortCode = await productService.getSortCode(sort);
  const priceCode = await productService.getPriceCode(price);

  // Pass data to view to display list of books
  console.log("Before delete template");
  res.render("products/delete", {
    layout: "main_layout",
    books,
    page,
    category,
    defaultcategoryURL,
    categoryURL,
    sort,
    sortCode,
    defaultsortURL,
    sortURL,
    price,
    priceCode,
    defaultpriceURL,
    priceURL,
    supplier,
    author,
    publisher,
    search,
  });
}

exports.book = async (req, res, next) => {
  //const item = req.body.book_id;
  // Get detailbooks from model
  var BookID = req.params.id;
  const detail = await productService.getBookByID(BookID);
  const category = await productService.getCatbyBookID(BookID);
  //res.render("detailBook/detail", { layout: "detaillayout", detail });
  res.render("products/detail", { layout: "main_layout", detail, category });
};

exports.CreateNewPage = async (req, res, next) => {
  //const item = req.body.book_id;
  // Get detailbooks from model
  var list_categories = await productService.getCategoryList();
  res.render("products/create_new", { layout: "main_layout", list_categories });
};

exports.CreateNewPost = async (req, res, next) => {
  //const item = req.body.book_id;
  // Get detailbooks from model
  const result = await cloudinary.uploader.upload(req.file.path);
  const fs = require("fs");
  fs.unlinkSync(req.file.path);
  if (
    await productService.addNewProduct(req, res, result.url, result.public_id)
  ) {
    //Render success page + return
    res.redirect("/products");
  }
  //Render errorpage
};

exports.ProductRemovePage = (req, res, next) => {
  index_for_remove(req, res, next);
};

exports.ProductRemovePost = async (req, res, next) => {
  var result = [];
  for (var i in req.body) result.push(i);
  if (req.body.restore) {
    await productService.restoreProducts(result);
  } else {
    await productService.deleteProducts(result);
  }

  res.redirect("/products/recyclebin");
};

exports.EditPage = async (req, res, next) => {
  //const item = req.body.book_id;
  // Get detailbooks from model
  var BookID = req.params.id;
  const detail = await productService.getBookByID(BookID);

  var category = await productService.getCatbyBookID(BookID);

  var list_category = await productService.getCategoryList();

  category=JSON.stringify(category);
  category=JSON.parse(category);

  list_category=JSON.stringify(list_category);
  list_category=JSON.parse(list_category);


  console.log(list_category.includes(category[0]));

  console.log(list_category)

  console.log(category[0])

  list_category = list_category.filter( function( el ) {
    return !category.includes( el );
  } );

  //res.render("detailBook/detail", { layout: "detaillayout", detail });
  res.render("products/edit", {
    layout: "main_layout",
    detail,
    category,
    list_category,
  });
};

exports.EditPost = async (req, res, next) => {
  //const item = req.body.book_id;
  // Get detailbooks from model
  console.log("controller");

  var BookID = req.params.id;
  const detail = await productService.getBookByID(BookID);

  image_url = detail.image;
  cloudinary_id = detail.cloudinary_id;

  if (req.file) {
    await cloudinary.uploader.destroy(detail.cloudinary_id);
    const result = await cloudinary.uploader.upload(req.file.path);
    const fs = require("fs");
    fs.unlinkSync(req.file.path);
    image_url = result.url;
    cloudinary_id = result.public_id;
  }

  await productService.editProduct(req, res, image_url, cloudinary_id);
  res.redirect("/products");
};
