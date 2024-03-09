import express from "express";
import {
  deleteMedecin,
  getAllMedecin,
  getMedecin,
  updateMedecin,
} from "../contollers/medecin.controller.js";
import { verifyToken, verifyTokenAdmin, verifyTokenAuthorisation } from "../middleware/jwt.js";

const router = express.Router();

router.get("/", verifyTokenAdmin, getAllMedecin);
router.get("/:id", verifyToken, getMedecin);
router.put("/:id", verifyTokenAuthorisation, updateMedecin);
router.delete("/:id", verifyTokenAdmin, deleteMedecin);

export default router;