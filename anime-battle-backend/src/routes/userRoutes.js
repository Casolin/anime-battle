import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { getDashboard } from "../controllers/userController.js";

const router = express.Router();

router.get("/dashboard", authenticate, getDashboard);

export default router;
