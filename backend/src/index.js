import express from "express";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/auth.route.js"
import employeeRoutes from "./routes/employee.route.js"

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);

app.get("/", (_, res) => res.send("Message from backend"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));