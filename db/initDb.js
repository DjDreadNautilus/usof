import mysql from "mysql2/promise";
import fs from "fs";

const initDb = async () => {
  const schema = fs.readFileSync("./db/db.sql", "utf-8");

  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    multipleStatements: true,
  });

  await connection.query(schema);

  console.log("Database has been initialized");
  await connection.end();
};

export default initDb;  