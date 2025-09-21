import Validator from "../services/Validator.js";
import Post from "../models/Posts.js";
import Category from "../models/Category.js";

export async function validatePostUpdate(req, res, next) {
    try {
        const { post_id } = req.params;

        const { title, content, categories, status } = req.body;

        const existingPost = await Post.find({ id: post_id });
        if (!existingPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (title !== undefined) {
            if (!Validator.isNonEmptyString(title)) {
                return res.status(400).json({ message: "Invalid title!" });
            }
            if (title.length < 3) {
                return res.status(400).json({ message: "Title must be at least 3 characters long." });
            }
        }

        if (content !== undefined) {
            if (!Validator.isNonEmptyString(content)) {
                return res.status(400).json({ message: "Invalid content!" });
            }
            if (content.length < 10) {
                return res.status(400).json({ message: "Content must be at least 10 characters long." });
            }
            if (content.length > 500) {
                return res.status(400).json({ message: "Content is too long ( longer that 500ch)" });
            }
        }

        let categoryIds = [];

        if (categories !== undefined) {
            if (!Array.isArray(categories)) {
                return res.status(400).json({ message: "Categories must be an array." });
            }

            categoryIds = categories
                .map(c => parseInt(c))
                .filter(Number.isInteger);
        }

        const existingIds = [];

        for(const category of categoryIds) {
            const current = await Category.find({ id: category });
            if(current) {
                existingIds.push(current.id);
            }
        }

        const missingIds = categoryIds.filter(id => !existingIds.includes(id));
        if (missingIds.length > 0) {
            return res.status(400).json({ message: `Some categories do not exist: ${missingIds.join(", ")}` });
        }

        if (status !== undefined) {
            if (!["active", "inactive"].includes(status)) {
                return res.status(400).json({ message: "Invalid status value" });
            }
        }

        next();
    } catch (err) {
        next(err);
    }
}

export default validatePostUpdate;