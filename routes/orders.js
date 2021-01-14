const express = require("express");
const router = express.Router();
const orderController = require("../controllers/ordersController");

router.get("/", orderController.OrderCon);
router.get("/pending", orderController.OrderPending);
router.get("/delivery", orderController.OrderDelivery);
router.get("/fulfill", orderController.OrderFulfill);
router.get("/cancel", orderController.OrderCancel);
router.get("/:id", orderController.OrderDetail);


router.post("/", orderController.OrderHandleSubmit);
router.post("/pending", orderController.OrderHandleSubmit);
router.post("/delivery", orderController.OrderHandleSubmit);
router.post("/fulfill", orderController.OrderHandleSubmit);
router.post("/cancel", orderController.OrderHandleSubmit);
module.exports = router;