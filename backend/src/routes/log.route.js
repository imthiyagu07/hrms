import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { listLogs } from "../controllers/log.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", listLogs);

export default router;