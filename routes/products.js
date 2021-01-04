const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const upload = require("../utils/multer");
/* GET home page. */

router.get("/", productController.ProductCon);
router.get("/create-new", productController.CreateNewPage);
router.get("/delete", productController.ProductRemovePage);
//router.get('/:id', productController.book);

router.post("/delete", productController.ProductRemovePost);
router.post(
  "/create-new",
  upload.single("image"),
  productController.CreateNewPost
);
module.exports = router;
