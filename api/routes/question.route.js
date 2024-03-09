import express from "express";

import { verifyToken, verifyTokenAdmin } from "../middleware/jwt.js";
import { addQuestion, deleteQuestion, getAllQuestion, getQuestion, updateQuestion } from "../contollers/question.controller.js";

const router = express.Router();

router.post("/", verifyTokenAdmin, addQuestion);
router.get("/", verifyToken, getAllQuestion);
router.get("/:id", verifyToken, getQuestion);
router.put("/:id",verifyTokenAdmin, updateQuestion);
router.delete("/:id", verifyToken, deleteQuestion);

export default router;