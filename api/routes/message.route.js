import express from "express";
import { addMessage, getMessage, getPatientMessage } from "../contollers/message.controller.js";
import { verifyToken, verifyTokenAuthorisation } from "../middleware/jwt.js";


const router = express.Router();

router.post("/", verifyToken, addMessage);
router.get("/", verifyToken, getPatientMessage);
router.get("/:id", verifyToken, getMessage);


export default router;
