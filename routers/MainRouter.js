const express = require("express");
const router = express.Router();

const AuthRouter = require("./auth/AuthRouter");
const UserRouter = require("./users/UserRouter");

router.use("/auth", AuthRouter);
router.use("/users", UserRouter);

module.exports = router;