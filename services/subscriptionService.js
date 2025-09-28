import Notification from "../models/Notification.js";
import UserSubscribes from "../models/UserSubscribes.js";

export const subscriptionService = {
    getAllSubscribersForPost: async (post_id) => {
        const subs = await UserSubscribes.getAll({post_id});
        return subs;
    },

    createNotification: async (user_id, post_id, type, payload = {}) => {
        const notification = new Notification({user_id, post_id, type, payload: JSON.stringify(payload)});
        notification.save();
    },

    notifySubscribers: async (post_id, type, payload = {}) => {
        const subs = subscriptionService.getAllSubscribersForPost(post_id);

        for(const sub of subs) {
            await subscriptionService.createNotification(sub.user_id, post_id, type, payload);
        }
    },

    getNotificationsForUser: async (user_id) => {
        const notifications = await Notification.getAll({user_id});
        if(notifications.length === 0) {
            return null;
        }
        return notifications;
    },
    
    clearNotificationsForUser: async (user_id) => {
        const notifications = await subscriptionService.getNotificationsForUser(user_id);
        if(notifications.length === 0) {
            return false;
        }

        for(const notification of notifications) {
            await notification.delete();
        }

        return true;
    }
}