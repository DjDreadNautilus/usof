import mysql from "mysql2/promise";
import fs from "fs";
import "dotenv/config.js";

const rootConfig = {
    host: process.env.DB_HOST,
    user: process.env.ROOT_USER || 'root',
    password: process.env.ROOT_PASSWORD,
    multipleStatements: true
};

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true
};

const initDb = async () => {
	const schema = fs.readFileSync("./db/db.sql", "utf-8");

	const connection = await mysql.createConnection(rootConfig);
	await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``);
	await connection.execute(`DROP USER IF EXISTS '${process.env.DB_USER}'@'localhost'`);
	await connection.execute(`CREATE USER '${process.env.DB_USER}'@'localhost' IDENTIFIED BY '${process.env.DB_PASSWORD}'`);
	await connection.execute(`GRANT ALL PRIVILEGES ON \`${process.env.DB_NAME}\`.* TO '${process.env.DB_USER}'@'localhost'`);
	await connection.execute('FLUSH PRIVILEGES');
	await connection.end();

	const dbConnection = await mysql.createConnection(dbConfig);
	await dbConnection.query(schema);

	console.log("Database has been initialized");
	await dbConnection.end();
};

export default initDb;  