const loginController = {

    getLogin: () => {
        res.send("Login form page");
    },
    
    login: async (req, res) => {
        try {

            //session stuff

            res.json({status: "Success!", message: "Successfully loged it!",});
            res.end;

        } catch (err) {
            console.error("Error during login:", err);
            res.status(500).send({error: "Internal Server Error!"});
        }

    }
}

module.exports = loginController;
