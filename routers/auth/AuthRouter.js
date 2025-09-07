const express = require("express");
const router = express.Router();
const SignupRouter = require("./SignupRouter");
const LoginRouter = require("./LoginRouter");

router.use("/register", SignupRouter);
router.use("/login", LoginRouter);

module.exports = router;