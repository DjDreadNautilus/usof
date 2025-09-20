import pool from "../db/pool.js";
import QuerryBuilder from "./QuerryBuilder.js";
 
class Model {
    constructor(attributes = {}) {
        Object.assign(this, attributes);
    }

    static async find(where = {}) {
        const rows = await QuerryBuilder.queryWhere(this.table_name, { where, limit: 1 });
        return rows.length ? new this(rows[0]) : null;
    }

    static async getAll(options = {}) {
        let { where = {}, limit, offset, orderBy, order, ...rest } = options;

        if (Object.keys(rest).length) {
            where = { ...where, ...rest };
        }

        const rows = await QuerryBuilder.queryWhere(this.table_name, { where, limit, offset, orderBy, order });
        return rows.map(row => new this(row));
    }

    async update(attributes = {}) {
        if (!this.id) return; 
        const keys = Object.keys(attributes);
        const values = Object.values(attributes);

        const updates = keys.map(key => `${key} = ?`).join(", ");
        const sql = `UPDATE ${this.constructor.table_name} SET ${updates} WHERE id = ?`;
        await pool.execute(sql, [...values, this.id]);
        Object.assign(this, attributes);
    }

    async save() {
        const fields = Object.keys(this).filter(key => key !== "id");
        const values = fields.map(key => this[key]);

        const sql = `INSERT INTO ${this.constructor.table_name} (${fields.join(", ")}) VALUES (${fields.map(() => "?").join(", ")})`;
        const [rows] = await pool.execute(sql, values);
        this.id = rows.insertId;
    }

    async delete() {
        if (this.id) {
            const sql = `DELETE FROM ${this.constructor.table_name} WHERE id = ?`;
            await pool.execute(sql, [this.id]);
        }
    }

}

export default Model;