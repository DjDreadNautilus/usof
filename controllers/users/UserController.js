const User = require("../../models/User");
const BaseController = require("../BaseController");
const Hash = require("../../services/Hash");

class UserController extends BaseController {
    constructor() {
        super(User);
    }

    async createUser(req, res) {
        try {
            const {login, fullname, password, email} = req.body;

            const hashedPassword = await Hash.hash(password, 10);
            const user = new User({login: login, fullname: fullname, password: hashedPassword, email: email});
            await user.save();

            res.json({status: "Success!", message: "User created!", });
        } catch(err) {
            res.status(500).json({error: err.message})
        }
    } 

    async updateUser(req, res) {
        const {login, fullname, password, email} = req.body;


    }

    async updateAvatar() {

    }
}

module.exports = new UserController();