import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { listEmployees, createEmployee, updateEmployee, deleteEmployee } from "../controllers/employee.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", listEmployees);
router.post("/", createEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

export default router;