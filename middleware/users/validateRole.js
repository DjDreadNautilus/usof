export async function validateRole(req, res, next) {
    try {
        const { role } = req.body;

        if (!["user", "admin"].includes(role)) {
            return res.status(400).json({ message: "Invalid role value" });
        }

        req.updates = req.updates || {};
        req.updates.role = role;

        next();
    } catch (err) {
        next(err);
    }
}