import Category from "../../models/Category.js";

export async function validateCategories(req, res, next) {
    try {
        const { categories } = req.body;
        if (categories === undefined) return next();

        if (!Array.isArray(categories)) {
            return res.status(400).json({ message: "Categories must be an array." });
        }

        const categoryIds = categories.map(c => parseInt(c)).filter(Number.isInteger);
        const existingIds = [];

        for (const id of categoryIds) {
            const category = await Category.find({ id });
            if (category) existingIds.push(category.id);
        }

        const missingIds = categoryIds.filter(id => !existingIds.includes(id));
        if (missingIds.length > 0) {
            return res.status(400).json({ message: `Some categories do not exist: ${missingIds.join(", ")}` });
        }

        req.updates = req.updates || {};
        req.updates.categories = categoryIds;
        next();
    } catch(err) {
        next(err);
    }
}