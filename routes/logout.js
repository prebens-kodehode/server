const express = require("express");
const router = express.Router();

const refreshController = require("../controllers/logoutController");

router.post("/", refreshController.handleLogout);

module.exports = router;
