const User = require("../../models/User");
const BaseController = require("../BaseController");
const Hash = require("../../services/Hash");

class UserController extends BaseController {
    constructor() {
        super(User);
    }

    async createUser(req, res) {
        try {
            const {login, fullname, password, email, role} = req.body;

            const hashedPassword = await Hash.hash(password, 10);
            const user = new User({login: login, fullname: fullname, password: hashedPassword, email: email, role: role !== null ? role : "user"});
            await user.save();

            res.json({status: "Success!", message: "User created!", });
        } catch(err) {
            res.status(500).json({error: err.message})
        }
    } 

    async updateUser(req, res) {
        try {
            const userId = req.params.id;
            const user = await User.find({ id: userId });

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            const updates = { ...req.body };

            if (updates.password) {
                updates.password = await Hash.hash(updates.password, 10);
            }

            await user.update(updates);

            res.json({ status: "Success!", message: "User updated!" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async updateAvatar() {

    }
}

module.exports = new UserController();