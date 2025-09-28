import pool from "../db/pool.js";

import Post from "../models/Posts.js";

import PostCategories from "../models/PostCategories.js";
import UserFavorites from "../models/UserFavorites.js";

export const postService = {
    createPost: async (user_id, title, content, categories) => {
        console.log({ user_id, title, content });

        const post = new Post({
            user_id,
            title,
            content,
            status: "active"
        });
        await post.save();

        for (const category of categories) {
            const relation = new PostCategories({ post_id: post.id, category_id: category });
            await relation.save();
        }

        return post;
    },

    updatePost: async (post, updates) => {
        const { categories, ...params } = updates;
        const post_id = post.id;
    
        await post.update(params);

        if (categories) {

            await PostCategories.deleteAll({post_id: post_id});

            for (const category_id of categories) {
                const relation = new PostCategories({ post_id, category_id });
                await relation.save();
            }
        }

        return post;
    },

    getAllFiltered: async ({page = 1, limit = 5, orderBy = "rating", order = "DESC", filters = {}} = {}) => {
        const offset = (page - 1) * limit;
        const status = filters.status;
        const values = [status];

        const allowedOrderBy = ["rating", "created_at"];
        if (!allowedOrderBy.includes(orderBy)) {
            orderBy = "rating";
        }

        const allowedOrder = ["ASC", "DESC"];
        if (!allowedOrder.includes(order.toUpperCase())) {
            order = "DESC";
        }

        let sql = `
            SELECT p.*, 
                COALESCE(SUM(CASE WHEN l.type='like' THEN 1 
                                    WHEN l.type='dislike' THEN -1 
                                    ELSE 0 END), 0) AS rating
            FROM posts p
            LEFT JOIN likes l ON l.post_id = p.id
            LEFT JOIN post_categories pc ON pc.post_id = p.id
        `;

        if (filters.favorites) {
            sql += ` INNER JOIN user_favorites uf ON uf.post_id = p.id AND uf.user_id = ${filters.favorites}`;
        }

        sql += ` WHERE p.status = ?`;

        if (filters.category_ids?.length > 0) {
            const placeholders = filters.category_ids.map(() => "?").join(",");
            sql += ` AND pc.category_id IN (${placeholders})`;
            values.push(...filters.category_ids);
        }

        if (filters.created_from) {
            sql += ` AND p.created_at >= ?`;
            values.push(filters.created_from);
        }

        if (filters.created_to) {
            sql += ` AND p.created_at <= ?`;
            values.push(filters.created_to);
        }

        sql += ` GROUP BY p.id`;

        sql += ` ORDER BY ${orderBy} ${order}`;

        sql += ` LIMIT ${limit} OFFSET ${offset}`;

        const [rows] = await pool.execute(sql, values);
        return rows;
    },
    
    addFavorite: async (post_id, user_id) => {
            const existingFavorite = await UserFavorites.find({user_id, post_id});
            if(existingFavorite) {
                existingFavorite.delete();
                return null;
            }
            const favorite = new UserFavorites({user_id, post_id});
            await favorite.save();

            return favorite;
    }, 

    getAllFavorite: async (user_id) => {
        const favorites = UserFavorites.getAll({user_id})
        if(!favorites) {
            return null;
        }
        return favorites;
    }
};
