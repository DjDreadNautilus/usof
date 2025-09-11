const express = require("express");
const router = express.Router();

const SignupRouter = require("./SignupRouter");
const LoginRouter = require("./LoginRouter");
const TokenRouter = require("./TokenRouter");

const loginController = require("../../controllers/auth/loginController");
const {authenticateAccessToken} = require("../../middleware/auth/authenticateAccessToken");

router.use("/register", SignupRouter);
router.use("/login", LoginRouter);

router.use("/token", TokenRouter);

router.post("/logout", authenticateAccessToken, loginController.logout);

module.exports = router;