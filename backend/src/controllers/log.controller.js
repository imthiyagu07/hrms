import db from "../models/index.js";

const Log = db.Log;
const User = db.User;

export const listLogs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 2;
        const offset = (page - 1) * limit;
        
        const { count, rows } = await Log.findAndCountAll({
            where: { organisationId: req.user.orgId },
            order: [["createdAt", "DESC"]],
            include: { model: User, attributes: ["id", "name", "email"] },
            limit,
            offset
        });

        return res.json({
            logs: rows,
            total: count,
            page,
            totalPages: Math.ceil(count / limit)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch logs" });
    }
}