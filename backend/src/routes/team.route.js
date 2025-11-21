import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { listTeams, createTeam, updateTeam, deleteTeam } from "../controllers/team.controller.js";

const router = express.Router()

router.use(authMiddleware);

router.get("/", listTeams);
router.post("/", createTeam);
router.put("/:id", updateTeam);
router.delete("/:id", deleteTeam);

export default router;