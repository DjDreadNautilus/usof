export const checkPostAvailability = (req, res, next) => {
    try {
        const post = req.item;
        console.log(post);
        if(post.status !== "active") {
            return res.status(403).json({message: "Post is unavailable"});
        }

        next();
    } catch(err) {
        next(err);
    }
} 