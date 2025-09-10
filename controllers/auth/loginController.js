const jwt = require("../../services/JWT");

const loginController = {

    getLogin: () => {
        res.send("Login form page");
    },
    
    login: async (req, res) => {
        try {

            const token = jwt.jwtGenerator({id: req.user.id, login: req.user.login, email: req.user.email, role: req.user.role});
            res.cookie('token',token,{httpOnly: true, maxAge: 12 * 60 * 60 * 1000});

            res.json({status: "Success!", message: "Successfully loged it!",});
            res.end;

        } catch (err) {
            console.error("Error during login:", err);
            res.status(500).send({error: "Internal Server Error!"});
        }
    },

    logout: async (req, res) => {
        try {
            res.clearCookie("token", {
                httpOnly: true,
                secure: "KEY",
                sameSite: "strict"
            });
            
            res.status(200).json({ message: "You were logged out" });
        } catch (err) {
            console.error("Error during logout:", err);
            res.status(500).json({ error: "Internal Server Error!" });
        }
    }
}

module.exports = loginController;
