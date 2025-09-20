import BaseController from "../BaseController.js";
import Category from "../../models/Category.js";
import PostCategories from "../../models/PostCategories.js";
import Post from "../../models/Posts.js";

class CategoryController extends BaseController {
    constructor() {
        super(Category);
    }

    async createCategory(req, res) {
        try {
            const { title, description } = req.body;

            if (!title) {
                return res.status(400).json({ error: "All fields required!" });
            }

            const category = new Category({
                title,
                description: description || "nothing here yet"
            });

            await category.save();

            res.status(200).json({ category, message: "Successfully created a category!" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async updateCategory(req, res) {
        try {
            const { category_id } = req.params;
            const category = await Category.find({ id: category_id });

            if (!category) {
                return res.status(404).json({ error: "Category not found" });
            }

            const updates = { ...req.body };
            await category.update(updates);

            res.json({ status: "Success!", message: "Category updated!" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getPosts(req, res) {
        try {
            const { category_id } = req.params;

            const relations = await PostCategories.getAll({ category_id });
            const ids = relations.map(r => r.post_id);

            const posts = await Post.getAll({ id: ids });

            res.status(200).json({ posts, message: "Got posts from category!" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default new CategoryController();