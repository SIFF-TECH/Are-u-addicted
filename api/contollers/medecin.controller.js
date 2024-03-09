import { db } from "../db.js";

export const getAllMedecin = (req, res, next) => {
  const q = "SELECT * FROM user, doctor WHERE user.ID_user = doctor.ID_user";
  try {
    db.query(q, (err, data) => {
      if (err) return next(err);
      return res.status(200).send(data);
    });
  } catch (err) {
    next(err);
  }
};
export const getMedecin = (req, res, next) => {
  const q =
    "SELECT * FROM user, doctor WHERE user.ID_user = doctor.ID_user AND user.ID_user = ?";
  try {
    db.query(q, [req.params.id], (err, data) => {
      if (err) return next(err);
      return res.status(200).send(data);
    });
  } catch (err) {
    next(err);
  }
};
export const updateMedecin = (req, res, next) => {
  const q = "UPDATE doctor SET confirmed = 1 WHERE ID_user = ?"
  try {
    db.query(q, [req.params.id], (err, data) => {
      if (err) return next(err)
      const q = "INSERT INTO alert(ID_sender, ID_receiver, type, content) VALUES(?, ?, 'approve', 'Your have been approved to be a doctor in this application')"
      db.query(q, [req.user.ID_user, req.params.id], (err, data) => {
        if (err) return next(err)
        return res.status(200).send("medecin updated successfully!")
      })
    })
  } catch (err) {

  }
};
export const deleteMedecin = (req, res, next) => {
  const q = "DELETE FROM doctor WHERE ID_user = ?";
  try {
    db.query(q, [req.params.id], (err) => {
      if (err) return next(err);
      return res.status(200).send("Doctor deleted successfully!");
    });
  } catch (err) {
    next(err);
  }
};
