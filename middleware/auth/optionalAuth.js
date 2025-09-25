import jwt from "jsonwebtoken";

export const optionalAuth = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];
    
    if (!token) {
        req.user = null;
        return next();
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            req.user = null;
        } else {
            req.user = decoded; 
        }
        next();
    });
};
