import Validator from "../services/Validator.js";
import Category from "../models/Category.js";

export async function validatePostCreate(req, res, next) {
    try {
        const { title, content, categories } = req.body;

        if (!title || !content || !categories) {
            return res.status(400).json({ message: "Title, content, and categories are required!" });
        }

        if (!Validator.isNonEmptyString(title) || title.length < 3) {
            return res.status(400).json({ message: "Title must be at least 3 characters long." });
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

        if (!Array.isArray(categories) || categories.length === 0) {
            return res.status(400).json({ message: "At least one category is required." });
        }

        const categoryIds = categories.map(c => parseInt(c)).filter(Number.isInteger);

        if (categoryIds.length !== categories.length) {
            return res.status(400).json({ message: "Invalid category format." });
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

        req.categories = categoryIds;

        next();
    } catch (err) {
        next(err);
    }
}

export default validatePostCreate;