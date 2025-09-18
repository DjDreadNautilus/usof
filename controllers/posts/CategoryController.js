const BaseController = require("../BaseController")
const Category = require("../../models/Category");
const PostCategories = require("../../models/PostCategories");
const Post = require("../../models/Posts");

class CategoryController extends BaseController {
    constructor() {
        super(Category);
    }

    async createCategory(req, res) {
        try {
            const {title, description} = req.body;

            if(!title) {
                return res.status(400).json({error: "all fields required!"});
            }

            const category = new Category({title: title, description: description ? description : "nothing here yet"});

            category.save();

            res.status(200).json({category: category, message: "Successfully created a category!"});
        } catch(err) {
            res.status(500).json({error: err.message});
        }
    }

    async updateCategory(req, res) {
        try {
            const id = req.params.category_id;
            const category = await Category.find({ id: id });

            if (!category) {
                return res.status(404).json({ error: "Category not found" });
            }

            //validator potom napishy

            const updates = { ...req.body };

            await category.update(updates);

            res.json({ status: "Success!", message: "Category updated!" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getPosts(req, res) {
        try {
            const id = req.params.category_id;
            
            const relations = await PostCategories.getAll({ category_id: id });
            const ids = relations.map(r => r.post_id);

            const posts = await Post.getAll({ id: ids });

            res.status(200).json({posts: posts, message: "Got posts from category!"});
        } catch(err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new CategoryController();