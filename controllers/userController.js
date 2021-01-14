const userService = require("../models/usersService");
const cloudinary = require("../utils/cloudinary");
async function Search(req, res, next) {
  var value = req.query.searchproduct;
  var limit = 12;
  var page = 1;
  var Result = search.Search(value, page, limit);
  Result.then((searchResult) => {
    res.render("users/list", {
      layout: "main_layout",
      books: searchResult,
      page,
    });
  });
}

exports.UserCon = (req, res, next) => {
  index(req, res, next);
};

exports.UserActive = (req, res, next) => {
  req.query.status = "Active";
  index(req, res, next);
};

exports.UserDel = (req, res, next) => {
  req.query.status = "Block";
  index_for_blocklist(req, res, next);
};

async function index(req, res, next) {
  console.log("index query");
  console.log(req.query);
  //Get current page, default by 1
  const curPage = +req.query.page || 1;

  //Get Search
  const search = req.query.search || "";

  //Get Sort type
  const sort = req.query.sort || "";

  //Get price
  const price = req.query.price || "";

  //Get Page infomation
  const status = req.query.status || "";
  const page = await userService.pageNumber(curPage, search, status);

  // Get books from model
  const users = await userService.getUsers(
    page.currentPage,
    search,
    sort,
    status
  );

  //get new url

  const sortURL = await userService.getURL(search, sort, price, 2);
  const defaultsortURL = sortURL.substring(0, sortURL.length - 1);

  const priceURL = await userService.getURL(search, sort, price, 3);
  const defaultpriceURL = priceURL.substring(0, priceURL.length - 1);

  const sortCode = await userService.getSortCode(sort);
  const priceCode = await userService.getPriceCode(price);

  // Pass data to view to display list of books
  res.render("users/list", {
    layout: "main_layout",
    users,
    page,
    sort,
    sortCode,
    defaultsortURL,
    sortURL,
    price,
    priceCode,
    defaultpriceURL,
    priceURL,
    search,
    status,
  });
}

async function index_for_blocklist(req, res, next) {
  //Get current page, default by 1
  const curPage = +req.query.page || 1;

  //Get Search
  const search = req.query.search || "";

  //Get catogory
  //const category = req.query.category || "";

  //Get Sort type
  const sort = req.query.sort || "";

  //Get price
  const price = req.query.price || "";

  //Get Supplier
  //const supplier = req.query.supplier || "";

  //Get Author
  //const author = req.query.author || "";

  //Get publisher
  //const publisher = req.query.publisher || "";

  //Get Page infomation
  const status = req.query.status || "";
  const page = await userService.pageNumber(curPage, search, status);

  // Get books from model
  const users = await userService.getUsers(
    page.currentPage,
    search,
    sort,
    status
  );

  //get new url

  const sortURL = await userService.getURL(search, sort, price, 2);
  const defaultsortURL = sortURL.substring(0, sortURL.length - 1);

  const priceURL = await userService.getURL(search, sort, price, 3);
  const defaultpriceURL = priceURL.substring(0, priceURL.length - 1);

  /*const authorURL = await bookService.getURL(category, sort, price, author, publisher, supplier, 4);
  const defaultauthorURL = authorURL.substring(0,authorURL.length-1);

  const publisherURL = await bookService.getURL(category, sort, price, author, publisher, supplier, 5);
  const defaultpublisherURL = publisherURL.substring(0,publisherURL.length-1);

  const supplierURL = await bookService.getURL(category, sort, price, author, publisher, supplier, 6);
  const defaultsupplierURL = supplierURL.substring(0,supplierURL.length-1);*/

  const sortCode = await userService.getSortCode(sort);
  const priceCode = await userService.getPriceCode(price);

  // Pass data to view to display list of books
  res.render("users/blocklist", {
    layout: "main_layout",
    users,
    page,
    sort,
    sortCode,
    defaultsortURL,
    sortURL,
    price,
    priceCode,
    defaultpriceURL,
    priceURL,
    search,
    status,
  });
}

exports.user = async (req, res, next) => {
  //const item = req.body.book_id;
  // Get detailbooks from model
  var BookID = req.params.id;
  const detail = await productService.getBookByID(BookID);

  res.render("detailBook/detail", { layout: "detaillayout", detail });
};

exports.CreateNewPage = async (req, res, next) => {
  //const item = req.body.book_id;
  // Get detailbooks from model
  res.render("users/create_new", { layout: "main_layout" });
};

exports.CreateNewPost = async (req, res, next) => {
  //const item = req.body.book_id;
  // Get detailbooks from model
  const result = await cloudinary.uploader.upload(req.file.path);
  const fs = require("fs");
  fs.unlinkSync(req.file.path);
  if (await userService.addUser(req, res, result.url, result.public_id)) {
    //Render success page + return
    res.redirect("/users");
  }
};

exports.user = async (req, res, next) => {
  var UserID = req.params.id;

  const detail = await userService.getUserByID(UserID);

  //res.render("detailBook/detail", { layout: "detaillayout", detail });
  res.render("users/detail", { layout: "main_layout", detail });
};

exports.UserActivePost = async (req, res, next) => {
  var result = [];
  for (var i in req.body) result.push(i);
  await userService.blockUsers(result);

  res.redirect("/users/active");
};

exports.UserBlocklistPost = async (req, res, next) => {
  var result = [];
  for (var i in req.body) result.push(i);
  if (req.body.restore) {
    await userService.unblockUsers(result);
  } else {
    await userService.deleteUsers(result);
  }

  res.redirect("/users/delete");
};
