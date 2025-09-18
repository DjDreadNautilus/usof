const express = require("express");
const router = express.Router();

const AuthRouter = require("./auth/AuthRouter");
const UserRouter = require("./users/UserRouter");
const CategoryRouter = require("./posts/CategoryRouter");
const PostRouter = require("./posts/PostRouter");

router.use("/auth", AuthRouter);
router.use("/users", UserRouter);
router.use("/categories", CategoryRouter);
router.use("/posts", PostRouter);

module.exports = router;