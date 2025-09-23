<<<<<<< Updated upstream
const express = require("express");
=======
import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import initDb from "./db/initDb.js";

import router from "./routers/MainRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

>>>>>>> Stashed changes
const app = express();
const http = require("http").createServer(app);
const cookieParser = require("cookie-parser")
const path = require("path");

const router = require("./routers/MainRouter");

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

const start = async () => {
  try {
    await initDb();

    server.listen(8080, () => {
      console.log("Hello,Welcome to http://localhost:8080 happy zoo (instant show)");
    });
  } catch (err) {
    console.error("Failed to initialize database:", err);
    process.exit(1);
  }
};

start();
