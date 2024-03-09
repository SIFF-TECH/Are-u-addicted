import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { addAlert, getAlert, updateAlert } from "../contollers/alert.controller.js";

const router = express.Router();

router.post("/", verifyToken, addAlert);
router.get("/", verifyToken, getAlert);
router.put("/:id", verifyToken, updateAlert);


export default router;