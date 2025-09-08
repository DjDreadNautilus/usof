const loginController = {

    getLogin: () => {
        res.send("Login form page");
    },
    
    login: async (req, res) => {
        try {

            req.session.authenticated = true;
            req.session.user = req.user;

            res.json({status: "Success!", message: "Successfully loged it!",});
            res.end;

        } catch (err) {
            console.error("Error during login:", err);
            res.status(500).send({error: "Internal Server Error!"});
        }
    },

    logout: async (req, res) => {
        try {
            req.session.authenticated = false;
            req.session.destroy(async (err) => {
                if (err) {
                    return res.status(500).json({error: "Failed to logout"});
                }
                await UserListBroadcaster.broadcast_user_list(req);
                res.status(200).json({message: "Logout successful"});
            })
            res.end;
        } catch (err) {
            console.error("Error during login:", err);
            res.status(500).send({error: "Internal Server Error!"});
        }
    }
}

module.exports = loginController;
