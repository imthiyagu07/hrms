import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token) return res.status(401).json({error: "No token provided"});
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) return res.status(401).json({error: "Invalid token"});
        req.user = {userId: decoded.userId, orgId: decoded.orgId, name: decoded.name};
        next();
    } catch (error) {
        console.error("JWT Error:", error);
        res.status(401).json({error: "Unauthorized"});
    }
}