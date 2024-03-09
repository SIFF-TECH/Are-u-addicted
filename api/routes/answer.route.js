import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { addAnswer, getAllAnswer, getAnswerQuestionnaire, getPoints } from "../contollers/answer.controller.js";

const router = express.Router();

router.post("/", verifyToken, addAnswer);
router.get("/", verifyToken, getAllAnswer);
router.get("/:id", verifyToken, getAnswerQuestionnaire);
router.get("/results/:id", verifyToken, getPoints);
router.put("/:id");
router.delete("/:id");

export default router;
