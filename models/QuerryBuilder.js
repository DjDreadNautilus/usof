const pool = require("../db/pool");

async function queryWhere(tableName,
                           {
                               where = {},
                               strict = false,
                               limit = null
                           } = {}) {
    const keys = Object.keys(where);
    const values = Object.values(where);

    const condition = keys.length
        ? keys.map(k => `${k} = ?`).join(strict ? ' AND ' : ' OR ')
        : '1';
    let sql = `SELECT * FROM ${tableName} WHERE ${condition}`;
    if (limit !== null)
        sql += ` LIMIT ${limit}`;

    const [rows] = await pool.execute(sql, values);
    return rows;
}

module.exports = {queryWhere};