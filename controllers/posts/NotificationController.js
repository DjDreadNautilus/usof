import BaseController from "../BaseController.js";
import Notification from "../../models/Notification.js";
import { subscriptionService } from "../../services/subscriptionService.js";

class NotificationController extends BaseController {
    constructor() {
        super(Notification);
    }

    getAllNotificationsForUser = async (req, res) => {
        try {
            const user = req.user;
            const notifications = await subscriptionService.getNotificationsForUser(user.user_id);
            if(!notifications) {
                return res.status(404).json({error: "no notifications"});
            }

            res.status(200).json({notifications, message: "Got notifications"});
        } catch(err) {
            res.status(500).json({ error: err.message });
        }
    }

    clearNotificationsForUser = async (req, res) => {
        try {
            const user = req.user;
            const notifications = await subscriptionService.clearNotificationsForUser(user.user_id);

            if(!notifications) {
                return res.status(404).json({error: "No notifications"})
            }

            res.status(200).json({message: "Notifications cleared"});
        } catch(err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default new NotificationController()