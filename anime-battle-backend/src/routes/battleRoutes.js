import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { startBattle } from "../controllers/battleController.js";

const router = express.Router();

router.post("/fight", authenticate, startBattle);

export default router;
