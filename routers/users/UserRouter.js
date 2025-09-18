const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/users/UserController");
const {validateSignup} = require("../../middleware/auth/validateSignup");
const {validateUserUpdate} = require("../../middleware/validateUserUpdate");
const fileUpload = require("../../middleware/fileUpload");
const {authenticateAccessToken} = require("../../middleware/auth/authenticateAccessToken");

router.get("/", UserController.getAll);
router.get("/:user_id", UserController.getById);
router.delete("/:user_id", UserController.delete);
router.post("/", validateSignup, UserController.createUser);
router.patch("/avatar", fileUpload, UserController.updateAvatar);
router.patch("/:user_id", validateUserUpdate, UserController.updateUser);


module.exports = router;