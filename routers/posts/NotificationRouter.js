import express from "express";
const router = express.Router();
import NotificationController from "../../controllers/posts/NotificationController.js";
import { authenticateAccessToken } from "../../middleware/auth/authenticateAccessToken.js";

router.get("/",
    authenticateAccessToken,
    NotificationController.getAllNotificationsForUser
);

router.delete("/",
    authenticateAccessToken,
    NotificationController.clearNotificationsForUser
);

export default router;