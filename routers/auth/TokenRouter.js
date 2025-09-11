const express = require("express");
const router = express.Router();
const loginController = require("../../controllers/auth/loginController");

router.post("/", loginController.refreshToken);

module.exports = router;