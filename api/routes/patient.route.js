import express from "express";
import {
  deletePatient,
  getAllPatient,
  getDoctorPatient,
  getPatient,
  getPatientStats,
  getPatientStatsDetail,
  updatePatient,
} from "../contollers/patient.controller.js";
import { verifyToken, verifyTokenAdmin, verifyTokenAuthorisation } from "../middleware/jwt.js";

const router = express.Router();

router.get("/", verifyTokenAdmin, getAllPatient);
router.get("/doctorPatient", verifyToken, getDoctorPatient);
router.get("/patientsStats", verifyToken, getPatientStats);
router.get("/patientsStatsDetail/:type", verifyToken, getPatientStatsDetail);
router.get("/:id", verifyToken, getPatient);
router.put("/:id", verifyTokenAuthorisation, updatePatient);
router.delete("/:id", verifyTokenAdmin, deletePatient);

export default router;
