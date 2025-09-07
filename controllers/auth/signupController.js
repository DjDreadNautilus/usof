const User = require("../../models/User");
const Hash = require("../../services/Hash");

const signupController = {

    getSignup: () => {
        res.send("Signup form page");
    },
    
    signup: async (req, res) => {
        try {
            const {login, fullname, password, email} = req.body;

            const hashedPassword = await Hash.hash(password, 10);
            const user = new User({login: login, fullname: fullname, password: hashedPassword, email: email});
            await user.save();

            res.json({status: "Success!", message: "Successfully registered!", });
            res.end;

        } catch (err) {
            console.error("Error during signup:", err);
            res.status(500).send({error: "Internal Server Error!"});
        }
    }
}

module.exports = signupController;
