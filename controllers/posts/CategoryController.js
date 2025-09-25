import BaseController from "../BaseController.js";
import Category from "../../models/Category.js";
import PostCategories from "../../models/PostCategories.js";
import Post from "../../models/Posts.js";
import { categoryService } from "../../services/categoryService.js";

class CategoryController extends BaseController {
    constructor() {
        super(Category);
    }

    createCategory = async (req, res) => {
        try {
            const { title, description } = req.body;

            const category = await categoryService.createCategory(title, description);
            
            if(!category) {
                return res.status(400).json({ message: "Category already exists" });
            } 

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

            const updatedCatergory = await categoryService.updateCategory(category, req.updates);

            res.json({updatedCatergory, message: "Category updated!" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    getPosts = async (req, res) => {
        try {
            const { category_id } = req.params;

            const posts = await categoryService.getPostsByCategoryId(category_id);

            if(!posts) {
                return res.status(404).json({erorr: "Posts not found"});
            }

            res.status(200).json({posts, message: "Got posts from category!"});
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default new CategoryController();