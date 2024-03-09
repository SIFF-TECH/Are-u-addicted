import express from "express";
import { verifyToken, verifyTokenAdmin } from "../middleware/jwt.js";
import { addConversation, getConversation, getOneConversation } from "../contollers/conversation.controller.js";

const router = express.Router();

router.post("/", verifyToken, addConversation);
router.get("/", verifyToken, getConversation);
router.get("/:id", verifyToken, getOneConversation);


export default router;