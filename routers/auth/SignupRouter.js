const express = require("express");
const router = express.Router();
const signupController = require("../../controllers/auth/signupController");
const {validateSignup} = require("../../middleware/auth/validateSignup");

router.post("/", validateSignup, signupController.signup);

module.exports = router;