const express = require("express");
const app = express();
const http = require("http").createServer(app);
const User = require("./models/User");

const router = require("./routers/MainRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

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

