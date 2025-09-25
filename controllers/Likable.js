import BaseController from "./BaseController.js";

import { recalculateUserRating } from "../services/recalculateUserRating.js";
import { likeService } from "../services/likeService.js";

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

            const like = await likeService.createLike(this.target, id, user.user_id, type)
            if(!like) {
                res.status(200).json({message: "like removed"})
            }
            await recalculateUserRating(item.user_id);

            res.status(200).json({ like, message: "Like created!" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };

    getLikes = async (req, res) => {
        try {
            const id = req.params[this.target];
            const likes = await likeService.getLikesByTargetId(this.target, id);
            if(!likes) {
                return res.status(404).json({erorr: "No likes"});
            }
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

            const success = await likeService.deleteLike(this.target, id, user.user_id);
            if(!success) {
                return res.status(404).json({ error: "Like not found" });
            }

            await recalculateUserRating(item.user_id);
            res.status(200).json({ message: "Like deleted" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };
}

export default Likable;