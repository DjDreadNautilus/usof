const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/users/UserController");
const {validateSignup} = require("../../middleware/auth/validateSignup");
const {validateUserUpdate} = require("../../middleware/validateUserUpdate");

router.get("/", UserController.getAll);
router.get("/:id", UserController.getById);
router.delete("/:id", UserController.delete);
router.post("/", validateSignup, UserController.createUser);
router.patch("/:id", validateUserUpdate, UserController.updateUser);

module.exports = router;