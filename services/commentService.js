import Comment from "../models/Comment.js"

export const commentService = {

    createComment: async (user_id, post_id, content) => {
            const comment = new Comment({
                user_id: user_id,
                post_id: post_id,
                content: content,
                created_at: new Date()
            });

            await comment.save();
            return comment;
    },

    getCommentsByPostId: async (post_id) => {
        const comments = await Comment.getAll({post_id});
        if(comments.length === 0) {
            return null;
        }
        return comments;
    },

    updateComment: async (comment, updates) => {
        await comment.update(updates);
        return comment;
    }
}