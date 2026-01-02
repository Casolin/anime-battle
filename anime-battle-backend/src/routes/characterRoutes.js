import express from "express";
import {
  createCharacter,
  deleteCharacter,
  getMyCharacters,
  getEnemyCharacters,
} from "../controllers/characterController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/user", authenticate, getMyCharacters);
router.get("/enemies", authenticate, getEnemyCharacters);
router.post("/add", authenticate, createCharacter);
router.delete("/delete/:id", authenticate, deleteCharacter);

export default router;
