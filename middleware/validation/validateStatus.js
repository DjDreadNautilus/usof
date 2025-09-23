export function validateStatus(req, res, next) {
    try {
        const { status } = req.body;
        if (status === undefined) return next();

        if (!["active", "inactive"].includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        req.updates = req.updates || {};
        req.updates.status = status;
        next();
    } catch(err) {
        next(err);
    }
}