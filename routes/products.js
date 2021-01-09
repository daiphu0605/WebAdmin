const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const upload = require("../utils/multer");
/* GET home page. */

router.get("/", productController.ProductCon);
router.get("/create-new", productController.CreateNewPage);
router.get("/recyclebin", productController.ProductRemovePage);
router.get('/:id', productController.book);
router.get('/:id/edit', productController.EditPage);


router.post("/", productController.ProductDel);
router.post("/recyclebin", productController.ProductRemovePost);
router.post(
  "/create-new",
  upload.single("image"),
  productController.CreateNewPost
);

router.post(
  "/:id/edit",
  upload.single("image"),
  productController.EditPost
);
module.exports = router;
