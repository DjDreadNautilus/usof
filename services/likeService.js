import Like from "../models/Like.js";

export const likeService = {
    createLike: async (target, id, user_id, type) => {
        const lookup = await Like.find({ [target]: id, user_id: user_id });

        if (lookup) {
            await lookup.delete();
            if (lookup.type === type) {
                return null;
            }
        }

        const like = new Like({
            user_id: user_id,
            [target]: id,
            type,
            created_at: new Date(),
        });

        await like.save();
        return like;
    },

    deleteLike: async (target, target_id, user_id) => {
            const like = await Like.find({ [target]: target_id, user_id });

            if (!like) {
                return false;
            }

            await like.delete();
            return true;
    },

    getLikesByTargetId: async (target, target_id) => {
        const likes = await Like.getAll({ [target]: target_id });
        if(likes.length === 0) {
            return null;
        }
        return likes;
    }
}