import db from "../models/index.js";

const Log = db.Log;
const User = db.User;

export const listLogs = async (req, res) => {
    try {
        const logs = await Log.findAll({where: {organisationId: req.user.orgId}, order: [["createdAt", "DESC"]],
        include: {model: User, attributes: ["id", "name", "email"]}});
        res.json(logs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch logs" });
    }
}