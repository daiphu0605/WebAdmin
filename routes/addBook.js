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
  const fs = require("fs");
  fs.unlinkSync(req.file.path);
  addBook.addBook(req, res, result.url);
});

module.exports = router;
