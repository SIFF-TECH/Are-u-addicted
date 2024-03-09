import express from "express";
import { verifyToken, verifyTokenAdmin } from "../middleware/jwt.js";
import { acceptRetest, addQuestionnaire, deleteQuestionnaire, getAllQuestionnaire, getQuestionnaire, retestQuestionnaire, submitQuestionnaire, updateQuestionnaire } from "../contollers/questionnaire.controller.js";


const router = express.Router();

router.post("/", verifyToken, addQuestionnaire);
router.post("/submit", verifyToken, submitQuestionnaire);
router.post("/retest", verifyToken, retestQuestionnaire);
router.post("/retest/accept", verifyToken, acceptRetest);
router.get("/", verifyTokenAdmin, getAllQuestionnaire);
router.get("/:id", verifyToken, getQuestionnaire);
router.put("/:id", verifyTokenAdmin, updateQuestionnaire);
router.delete("/:id", verifyTokenAdmin, deleteQuestionnaire);

export default router;