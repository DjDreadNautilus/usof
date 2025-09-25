import PostCategories from "../models/PostCategories.js";
import Category from "../models/Category.js";
import Post from "../models/Posts.js";

export const categoryService = {
    createCategory: async (title, description = "nothing here yet") => {
        const existingCategory = await Category.find({title: title});
        if(existingCategory) {
            return null;
        } 

        const category = new Category({
            title,
            description: description
        });

        await category.save();
        return category;
    }, 

    getCategoriesByPostId: async (post_id) => {
        const relations = await PostCategories.getAll({ post_id: post_id });
        if(relations.length === 0) {
            return null;
        }
        const ids = relations.map(r => r.category_id);

        const categories = await Category.getAll({ id: ids });
        return categories;
    },

    updateCategory: async (category, updates) => {
        await category.update(updates);
        return category;
    },  

    getPostsByCategoryId: async (category_id) => {
        const relations = await PostCategories.getAll({ category_id: category_id });
        if(relations.length === 0) {
            return null;
        }
        const ids = relations.map(r => r.post_id);

        const posts = await Post.getAll({ id: ids });
        return posts;
    }
}