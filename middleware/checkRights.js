function checkRights(allowedRoles = [], allowSelf = false) {
    return (req, res, next) => {
        try {
            const user = req.user;
            console.log(user);
            const targetUserId = req.params.id;

            if (allowedRoles.includes(user.role)) {
                return next();
            }

            if (allowSelf && user.id?.toString() === targetUserId?.toString()) {
                return next();
            }

            return res.status(403).json({ message: "You lack rights" });
        } catch(err) {
            next(err);
        }
    };
}

module.exports = {checkRights};