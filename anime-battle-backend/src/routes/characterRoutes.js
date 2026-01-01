import express from "express";
import {
  createCharacter,
  deleteCharacter,
  getMyCharacters,
  getAllCharacters,
} from "../controllers/characterController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/characters/user", authenticate, getMyCharacters);
router.get("/characters", authenticate, getAllCharacters);
router.post("/characters/add", authenticate, createCharacter);
router.delete("/characters/delete/:id", authenticate, deleteCharacter);

export default router;
