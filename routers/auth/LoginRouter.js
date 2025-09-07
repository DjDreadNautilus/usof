const express = require("express");
const router = express.Router();
const loginController = require("../../controllers/auth/loginController");
const {validateLogin} = require("../../middleware/auth/validateLogin");

router.post("/", validateLogin, loginController.login);

module.exports = router;