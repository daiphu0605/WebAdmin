var express = require("express");
var router = express.Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
var addBook = require("../controllers/addBookController");

router.get("/", (req, res, next) => {
  res.render("detailBook/detail_add", { layout: "layout_addBook" });
});

router.post("/", upload.single("image"), async (req, res, next) => {
  const result = await cloudinary.uploader.upload(req.file.path);

  addBook.addBook(req, res, result.url);

  //res.render("./product/add_book_fin", { layout: "layout_addBook" });
});

module.exports = router;
