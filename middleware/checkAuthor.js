function checkAuthor(model) {
    return async (req, res, next) => {
        try {
            const user = req.user;
            const item = req.item;

            if (model.table_name === "users" && item.id === user.user_id) {
                return next()
            }

            if (item.user_id && item.user_id === user.user_id) {
                return next()
            }

            return res.status(403).json({message: "Forbidden"});
        } catch(err) {
            next(err);
        }
    }   
}

export default checkAuthor;