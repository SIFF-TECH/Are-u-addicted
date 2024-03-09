import express from "express";
import {
  login,
  logout,
  registerMedecin,
  registerPatient,
  registerUser,
} from "../contollers/auth.controller.js";

const router = express.Router();

router.post("/register/user", registerUser);
router.post("/register/patient", registerPatient);
router.post("/register/medecin", registerMedecin);
router.post("/login", login);
router.post("/logout", logout);

export default router;
