const express = require("express");
const app = express();
const http = require("http").createServer(app);

const router = require("./routers/MainRouter");
const session = require("express-session");

const session_middleware = session({
    secret: "secure, frfr, no cap",
    saveUninitialized: false,
    resave: true,
    cookie: {secure: process.env.NODE_ENV === "production"}
});  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session_middleware);
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

