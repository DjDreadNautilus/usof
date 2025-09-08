const express = require("express");
const router = express.Router();
const SignupRouter = require("./SignupRouter");
const LoginRouter = require("./LoginRouter");

router.use("/register", SignupRouter);
router.use("/login", LoginRouter);

router.post("/logout",  (req, res) => {
    req.session.destroy(async (err) => {
        if (err) {
            return res.status(500).json({error: "Failed to logout"});
        }
        res.status(200).json({message: "Logout successful"});
    });
});

module.exports = router;