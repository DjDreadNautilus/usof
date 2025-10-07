import User from "../../models/User.js";
import BaseController from "../BaseController.js";
import { userService } from "../../services/userService.js";

class UserController extends BaseController {
    constructor() {
        super(User);
    }

    async createUser(req, res) {
        try {
            const { login, password, email, role } = req.updates;
            const {fullname} = req.body;

            const user = await userService.createUser(login, fullname, password, email, true, role);

            res.status(201).json({ user, message: "User created!"});
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async updateUser(req, res) {
        try {
            const user = req.item;
            console.log(user);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const updates = req.updates;

            const updatedUser = await userService.updateUser(user, updates);

            res.status(200).json({updatedUser, message: "User updated!" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async updateAvatar(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({ message: "Avatar file is required" });
            }
            
            const user = await User.find({ id: req.user.user_id });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const relativePath = `/uploads/avatars/${req.file.filename}`;
            await user.update({ avatar: relativePath });

            res.json({
                status: "Success",
                message: "Avatar uploaded successfully",
                avatar: relativePath
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

export default new UserController();