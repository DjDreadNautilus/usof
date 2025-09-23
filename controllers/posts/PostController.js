import Category from "../../models/Category.js";
import PostCategories from "../../models/PostCategories.js";
import Post from "../../models/Posts.js";
import Likable from "../Likable.js";
import Comment from "../../models/Comment.js";

class PostController extends Likable {
    constructor() {
        super(Post, "post_id");
    }

    createPost = async (req, res) => {
        try {
            console.log(req.postData);
            const { title, content, categories } = req.updates;
            const user = req.user;

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

    updatePost = async (req, res) => {
        try {
            const { post_id } = req.params;

            const post = req.item;

            const { categories, ...updates } = req.updates;
            
            post.update(updates);

            if (categories) {

                await PostCategories.deleteAll({post_id: post_id});

                for (const category_id of categories) {
                    const relation = new PostCategories({ post_id, category_id });
                    await relation.save();
                }
            }

            res.status(200).json({message: "Post updated"});
        } catch(err) {
            res.status(500).json({ error: err.message });
        }
    }


    getCategories = async (req, res) => {
        try {
            const { post_id } = req.params;

            const relations = await PostCategories.getAll({ post_id: post_id });
            const ids = relations.map(r => r.category_id);

            const categories = await Category.getAll({ id: ids });

            res.status(200).json({ categories, message: "Got categories from post!" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    createComment = async (req, res) => {
        try {
            const post = req.item;
            if(post.status === "inactive") {
                return res.status(400).json({message: "Post is not available"});
            }
            
            const user = req.user;
            const { content } = req.updates;

            if (!content) {
                return res.status(400).json({ error: "Empty comment" });
            }

            const comment = new Comment({
                user_id: user.user_id,
                post_id: post.id,
                content: content,
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

            const comments = await Comment.getAll({ post_id: post_id });

            res.status(200).json({ comments, message: "Got comments from post!" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    getAllFiltered = async (req, res) => {
        try {
            const query = req.query;
            let status = "active";
            if(req.user && req.user.role === "admin") {
                status = ""
            }

            let category_ids = [];
            if (query.category_ids) {
                category_ids = query.category_ids.split(",").map(id => parseInt(id));
            }   

            const limit = query.limit ? parseInt(query.limit) : 5;
            const page = query.page ? parseInt(query.page) : 1;
            const offset = (page - 1) * limit

            const filters = {
                category_ids,
                status: status,
                user_id: query.user_id ? parseInt(query.user_id) : undefined,
                created_from: query.created_from,
                created_to: query.created_to,
                order_by: query.order_by,
                order: query.order,
                limit: limit,
                offset: offset
            };

            Object.keys(filters).forEach(key => filters[key] === undefined && delete filters[key]);
            console.log(filters);

            const posts = await Post.filter(filters);
            res.json(posts);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default new PostController();