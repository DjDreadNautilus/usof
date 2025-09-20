import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import router from "./routers/MainRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", router);

app.use("/storage/avatars", express.static(path.join(__dirname, "storage/avatars")));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.use((req, res) => {
    res.status(404).send('Route not found');
});

server.listen(8080, () => {
    console.log("poehali!");
});