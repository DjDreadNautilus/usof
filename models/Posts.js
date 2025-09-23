import pool from "../db/pool.js";
import Model from "./Model.js";

class Post extends Model {
    static table_name = "posts";

    constructor(attributes = {}) {
        super(attributes);
    }

    static async filter(filters = {}) {
        let sql = `
            SELECT p.*, SUM(DISTINCT CASE WHEN l.type = 'like' THEN 1 WHEN l.type = 'dislike' THEN -1 ELSE 0 END) AS rating
            FROM posts p
            LEFT JOIN post_categories pc ON p.id = pc.post_id
            LEFT JOIN likes l ON l.post_id = p.id 
            WHERE 1=1
        `;

        const values = [];

        if (filters.category_ids?.length) {
            const placeholders = filters.category_ids.map(() => "?").join(", ");
            sql += ` AND pc.category_id IN (${placeholders})`;
            values.push(...filters.category_ids);
        }
        if (filters.status) {
            sql += ` AND p.status = ?`;
            values.push(filters.status);
        }
        if (filters.user_id) {
            sql += ` AND p.user_id = ?`;
            values.push(filters.user_id);
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

        if (!filters.order_by) {
            sql += ` ORDER BY rating DESC`;
        } else {
            const order = filters.order?.toUpperCase() === "DESC" ? "DESC" : "ASC";
            sql += ` ORDER BY p.${filters.order_by} ${order}`;
        }

        if (filters.limit !== undefined) {
            sql += ` LIMIT ${filters.limit}`;
        }

        if (filters.offset !== undefined) {
            sql += ` OFFSET ${filters.offset}`;
        }

        console.log(sql);
        console.log(values);

        const [rows] = await pool.execute(sql, values);
        return rows.map(row => new Post(row));
    }
}

export default Post;