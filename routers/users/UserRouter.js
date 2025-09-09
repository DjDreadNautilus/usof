const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/users/UserController");
const {validateSignup} = require("../../middleware/auth/validateSignup");
const {checkRights} = require("../../middleware/checkRights");
const {authenticate} = require("../../middleware/auth/authenticate");
const {validateUserUpdate} = require("../../middleware/validateUserUpdate");

router.use(authenticate);
router.get("/", checkRights(["admin"], false), UserController.getAll);
router.get("/:id", checkRights(["admin"], false), UserController.getById);
router.delete("/:id", checkRights(["admin"], true), UserController.delete);
router.post("/", checkRights(["admin"], false), validateSignup, UserController.createUser);
router.patch("/:id", checkRights(["admin"], true), validateUserUpdate, UserController.updateUser);

module.exports = router;