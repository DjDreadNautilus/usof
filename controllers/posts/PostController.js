import Category from "../../models/Category.js";
import PostCategories from "../../models/PostCategories.js";
import Post from "../../models/Posts.js";
import Likable from "../Likable.js";
import Comment from "../../models/Comment.js";

class PostController extends Likable {
    constructor() {
        super(Post, "post_id");
    }

    async createPost(req, res) {
        try {
            const { title, content, categories } = req.body;
            const user = req.user;

            if (!title || !content || !categories) {
                return res.status(400).json({ error: "All fields required!" });
            }

            const post = new Post({
                user_id: user.user_id,
                title,
                content,
                status: "active"
            });
            await post.save();

            for (const category of categories) {
                const relation = new PostCategories({ post_id: post.id, category_id: category });
                await relation.save();
            }

            res.status(200).json({ post, message: "Successfully created a post!" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getCategories(req, res) {
        try {
            const { post_id } = req.params;

            const relations = await PostCategories.getAll({ post_id });
            const ids = relations.map(r => r.category_id);

            const categories = await Category.getAll({ id: ids });

            res.status(200).json({ categories, message: "Got categories from post!" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async createComment(req, res) {
        try {
            const { post_id } = req.params;
            const user = req.user;
            const { content } = req.body;

            if (!content) {
                return res.status(400).json({ error: "Empty comment" });
            }

            const comment = new Comment({
                user_id: user.user_id,
                post_id,
                content,
                created_at: new Date()
            });

            await comment.save();

            res.status(200).json(comment);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getComments(req, res) {
        try {
            const { post_id } = req.params;

            const comments = await Comment.getAll({ post_id });

            res.status(200).json({ comments, message: "Got comments from post!" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    getAll = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 5;
            const offset = (page - 1) * limit;
            const { orderBy, order = "ASC" } = req.query;

            const posts = await Post.getAll({ limit, offset, orderBy, order });

            res.json(posts);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default new PostController();