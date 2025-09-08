const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/users/UserController");
const {validateSignup} = require("../../middleware/auth/validateSignup");
const {checkRights} = require("../../middleware/checkRights");

router.get("/", UserController.getAll);
router.get("/:id", UserController.getById);
router.delete("/:id", checkRights(["admin"], true), UserController.delete);
router.post("/", checkRights(["admin"], false), validateSignup, UserController.createUser);

module.exports = router;