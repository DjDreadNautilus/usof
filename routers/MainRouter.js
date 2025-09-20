import express from "express";
const router = express.Router();

import AuthRouter from "./auth/AuthRouter.js";
import UserRouter from "./users/UserRouter.js";
import CategoryRouter from "./posts/CategoryRouter.js";
import PostRouter from "./posts/PostRouter.js";
import CommentRouter from "./posts/CommentRouter.js";

router.use("/auth", AuthRouter);
router.use("/users", UserRouter);
router.use("/categories", CategoryRouter);
router.use("/posts", PostRouter);
router.use("/comments", CommentRouter);

export default router;