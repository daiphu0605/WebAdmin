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
  var value = req.query.searchproduct;
  if (value == null) {
    index(req, res, next);
  } else {
    Search(req, res, next);
  }
};

exports.UserDel = (req, res, next) => {
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
  const page = await userService.pageNumber(curPage, catID);

  // Get books from model
  const users = await userService.users(curPage, catID);

  // Pass data to view to display list of books
  res.render("users/list", { layout: "main_layout", users, page });
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
  if (
    await userService.addUser(req, res, result.url, result.public_id)
  ) {
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

exports.UserDelPost = async (req, res, next) => {
  var result = [];
  for (var i in req.body) result.push(i);
  await userService.blockUsers(result);
  index(req, res, next);
};
