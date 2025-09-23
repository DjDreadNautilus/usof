import BaseController from "../BaseController.js";
import Category from "../../models/Category.js";
import PostCategories from "../../models/PostCategories.js";
import Post from "../../models/Posts.js";

class CategoryController extends BaseController {
    constructor() {
        super(Category);
    }

    createCategory = async (req, res) => {
        try {
            const { title, description } = req.body;

            const existingCategory = await Category.find({title: title});
            if(existingCategory) {
                return res.status(400).json({message: "Category exists!"});
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

    updateCategory = async(req, res) => {
        try {
            const category = req.item;

            if (!category) {
                return res.status(404).json({ error: "Category not found" });
            }

            const updates = req.updates;
            await category.update(updates);

            res.json({ status: "Success!", message: "Category updated!" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    getPosts = async (req, res) => {
        try {
            const { category_id } = req.params;

            const relations = await PostCategories.getAll({ category_id: category_id });
            const ids = relations.map(r => r.post_id);

            const posts = await Post.getAll({ id: ids });

            res.status(200).json({ posts, message: "Got posts from category!" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default new CategoryController();