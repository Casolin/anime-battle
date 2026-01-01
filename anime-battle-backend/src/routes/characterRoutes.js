import express from "express";
import {
  createCharacter,
  deleteCharacter,
  getMyCharacters,
  getAllCharacters,
} from "../controllers/characterController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/user", authenticate, getMyCharacters);
router.get("/", authenticate, getAllCharacters);
router.post("/add", authenticate, createCharacter);
router.delete("/delete/:id", authenticate, deleteCharacter);

export default router;
