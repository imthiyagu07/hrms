import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    try {
        const header = req.headers.authorization;
        if(!header) return res.status(401).json({error: "No token provided"});
        const token = header.split(" ")[1];
        if (!token) return res.status(401).json({error: "Invalid token format"});
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            userId: decoded.userId,
            orgId: decoded.orgId
        };
        next();
    } catch (error) {
        console.error("JWT Error:", error);
        res.status(401).json({error: "Unauthorized"});
    }
}