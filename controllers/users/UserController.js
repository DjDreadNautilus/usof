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
            const targetId = req.params.id;
            const {login, fullname, password, email, role} = req.body;
            const user = User.find({id: targetId});

            if(login) user.login = login;
            if(fullname) user.fullname = fullname;
            if(password) user.password = Hash.hash(password, 10);
            if(email) user.email = email;
            if(role) user.role = role;

            user.save();

            res.json({status: "Success!", message: "User updated!", });
        } catch (err) {
            res.status(500).json({error: err.message});
        }
    }

    async updateAvatar() {

    }
}

module.exports = new UserController();