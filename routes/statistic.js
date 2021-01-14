const express = require("express");
const router = express.Router();
const statisticController = require("../controllers/statisticController");

router.get("/", statisticController.statistic);

module.exports = router;