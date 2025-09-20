    const pool = require("../db/pool");

    async function queryWhere(table, {where = {}, limit, offset, orderBy, order = "ASC"}) {
        const conditions = [];
        const values = [];

        for (const [key, value] of Object.entries(where)) {
            if (Array.isArray(value)) {
                const placeholders = value.map(() => "?").join(", ");
                conditions.push(`${key} IN (${placeholders})`);
                values.push(...value);
            } else {
                conditions.push(`${key} = ?`);
                values.push(value);
            }
        }

        const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
        const limitClause = limit ? `LIMIT ${limit}` : "";
        const offsetClause = offset ? `OFFSET ${offset}` : "";
        const orderClause = orderBy ? `ORDER BY ${orderBy} ${order}` : "";
        const sql = `SELECT * FROM ${table} ${whereClause}  ${orderClause} ${limitClause} ${offsetClause}`;

        const [rows] = await pool.execute(sql, values);
        return rows;
    }

    module.exports = {queryWhere};