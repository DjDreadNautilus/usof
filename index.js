const express = require("express");
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

http.listen(8080, () => {
    console.log("poehali!");
})

