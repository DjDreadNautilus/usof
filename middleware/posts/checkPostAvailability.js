export const checkPostAvailability = (req, res, next) => {
    try {
        const post = req.item;

        if(post.status !== "active") {
            return res.status(403).json({error: "Post is unavailable"});
        }


    } catch(err) {
        next(err);
    }
} 