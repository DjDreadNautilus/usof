const Category = require("../../models/Category");
const PostCategories = require("../../models/PostCategories");
const Post = require("../../models/Posts");
const Likable = require("../Likable");
const Comment = require("../../models/Comment");
const Like = require("../../models/Like");


class PostController extends Likable {
    constructor() {
        super(Post, "post_id");
    }

    async createPost(req, res) {
        try {
            const {title, content, categories} = req.body;
            const user = req.user;

            if(!title || !content || !categories) {
                return res.status(400).json({error: "all fields required!"});
            }

            console.log(categories);

            const post = new Post({user_id: user.user_id, title: title, content: content, status: "active"});
            await post.save();
            console.log(post.id);

            for(const category of categories) {
                const relatoin = new PostCategories({post_id: post.id, category_id: category});
                await relatoin.save();
                console.log(relatoin);
            }

            res.status(200).json({post: post, message: "Successfully created a post!"});
        } catch(err) {
            res.status(500).json({error: err.message});
        }
    }

    async getCategories(req, res) {
        try {
            const id = req.params.post_id;

            const relations = await PostCategories.getAll({ post_id: id });
            const ids = relations.map(r => r.category_id);

            const categories = await Category.getAll({ id: ids });

            res.status(200).json({categories: categories, message: "Got categories from post!"});
        } catch(err) {
           res.status(500).json({error: err.message}); 
        }
    }

    async createComment(req, res) {
        try {
            const id = req.params.post_id;
            const user = req.user;
            const content = req.body.content;

            if(!content) {
                res.status(400).json({error: "Empty comment"});
            }

            const comment = new Comment({user_id: user.user_id, post_id: id, content: content, created_at: new Date()});
            console.log(comment);
            
            comment.save();

            res.status(200).json(comment);
        } catch(err) {
            res.status(500).json({error: err.message}); 
        }
    }

    async getComments(req, res) {
        try {
            const id = req.params.post_id;

            const comments = await Comment.getAll({ post_id: id });

            res.status(200).json({comments: comments, message: "Got comments from post!"});
        } catch(err) {
           res.status(500).json({error: err.message}); 
        }
    }

    getAll = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1; 
            const limit = parseInt(req.query.limit) || 5;   
            const offset = (page - 1) * limit;   
            const orderBy = req.query.orderBy;
            const order = req.query.order || "ASC";

            const posts = await Post.getAll({limit: limit, offset: offset, orderBy: orderBy, order: order});

            res.json(posts);
        } catch(err) {
           res.status(500).json({error: err.message}); 
        }
    }
}

module.exports = new PostController();