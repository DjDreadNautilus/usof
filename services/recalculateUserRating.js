import Like from "../models/Like.js";
import Post from "../models/Posts.js";
import Comment from "../models/Comment.js";
import User from "../models/User.js";

export const recalculateUserRating = async (user_id) => {

    const posts = await Post.getAll({ user_id });
    const comments = await Comment.getAll({ user_id });
    const user = await User.find({id: user_id});

    const postIds = posts.map(p => p.id);
    const commentIds = comments.map(c => c.id);

    const postLikes = postIds.length > 0 
    ? await Like.getAll({ post_id: postIds }) 
    : [];

    const commentLikes = commentIds.length > 0 
    ? await Like.getAll({ comment_id: commentIds }) 
    : [];

    const allLikes = [...postLikes, ...commentLikes];

    let rating = 0;
    allLikes.forEach(like => {
        rating += like.type === "like" ? 1 : -1;
    });

    await user.update({rating: rating});
};