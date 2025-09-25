import BaseController from "./BaseController.js";
import Like from "../models/Like.js";

import { recalculateUserRating } from "../services/recalculateUserRating.js";

class Likable extends BaseController {
    constructor(model, target) {
        super(model);
        this.target = target;
    }

    createLike = async (req, res) => {
        try {
            const id = req.params[this.target];
            const user = req.user;
            const item = req.item;
            const { type } = req.body;

            const lookup = await Like.find({ [this.target]: id, user_id: user.user_id });

            if (lookup) {
                await lookup.delete();
                if (lookup.type === type) {
                    return res.status(200).json({ message: "Like removed" });
                }
            }

            const like = new Like({
                user_id: user.user_id,
                [this.target]: id,
                type,
                created_at: new Date(),
            });

            await like.save();
            await recalculateUserRating(item.user_id);
            res.status(200).json({ like, message: "Like created!" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };

    getLikes = async (req, res) => {
        try {
            const id = req.params[this.target];
            const likes = await Like.getAll({ [this.target]: id });

            res.status(200).json({ likes, message: "Likes retrieved successfully" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };

    deleteLike = async (req, res) => {
        try {
            const id = req.params[this.target];
            const user = req.user;
            const item = req.item;
            const like = await Like.find({ [this.target]: id, user_id: user.user_id });

            if (!like) {
                return res.status(404).json({ error: "Like not found" });
            }

            await like.delete();
            recalculateUserRating(item.user_id);

            res.status(200).json({ message: "Like deleted" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };
}

export default Likable;