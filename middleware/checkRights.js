function checkRights(allowedRoles = [], allowSelf = false) {
    return (req, res, next) => {
        const user = req.session.user;
        const targetUserId = req.params.id;

        if (!user) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        if (allowedRoles.includes(user.role)) {
            return next();
        }

        if (allowSelf && user.id === targetUserId) {
            return next();
        }

        return res.status(403).json({ message: "You lack rights" });
    };
}

module.exports = {checkRights};