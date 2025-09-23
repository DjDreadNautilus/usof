async function checkAdmin(req, res, next) {
    try {
        const user = req.user;

        if (user.role === "admin") {
            return next()
        }

        return res.status(403).json({message: "Forbidden"});
    } catch(err) {
        next(err);
    }
}

export default checkAdmin;