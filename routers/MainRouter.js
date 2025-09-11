const express = require("express");
const router = express.Router();

const AuthRouter = require("./auth/AuthRouter");
const UserRouter = require("./users/UserRouter");

router.use("/auth", AuthRouter);
router.use("/users", UserRouter);
router.post("/ping", require("../middleware/auth/authenticateAccessToken").authenticateAccessToken, (req, res) => {
    console.log(req.user);
    res.json({user: req.user});
}); 

module.exports = router;