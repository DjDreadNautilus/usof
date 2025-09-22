import User from "../../models/User.js";
import BaseController from "../BaseController.js";
import Hash from "../../services/Hash.js";

class UserController extends BaseController {
    constructor() {
        super(User);
    }

    async createUser(req, res) {
        try {
            const { login, password, email, role } = req.updates;
            const {fullname} = req.body;

            const hashedPassword = await Hash.hash(password, 10);
            const user = new User({
                login,
                fullname,
                password: hashedPassword,
                email,
                role: role ?? "user",
                rating: 0
            });

            await user.save();

            res.status(201).json({ status: "Success", message: "User created!", user });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async updateUser(req, res) {
        try {
            const user = req.item;
            console.log(user);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            const updates = req.updates;
            console.log(updates)

            if (updates.password) {
                updates.password = await Hash.hash(updates.password, 10);
            }

            await user.update(updates);

            res.status(200).json({ status: "Success", message: "User updated!" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async updateAvatar(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({ error: "Avatar file is required" });
            }

            const user = await User.find({ id: req.user.user_id });
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            const relativePath = `/uploads/avatars/${req.file.filename}`;
            await user.update({ avatar: relativePath });

            res.json({
                status: "Success",
                message: "Avatar uploaded successfully",
                avatar: relativePath
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default new UserController();