const Category = require("../../models/Category");
const PostCategories = require("../../models/PostCategories");
const Post = require("../../models/Posts");
const BaseController = require("../BaseController");


class PostController extends BaseController {
    constructor() {
        super(Post);
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
}

module.exports = new PostController();