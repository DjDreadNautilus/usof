const express = require("express");
const router = express.Router();
const SignupRouter = require("./SignupRouter");
const LoginRouter = require("./LoginRouter");
const loginController = require("../../controllers/auth/loginController");

router.use("/register", SignupRouter);
router.use("/login", LoginRouter);

router.post("/logout", loginController.logout);

module.exports = router;