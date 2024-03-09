import { db } from "../db.js";
import createError from "../utils/createError.js";
import getMedecinID from "../utils/getMedecinID.js";

export const getAllPatient = (req, res, next) => {
  const q = "SELECT * FROM user, patient WHERE user.ID_user = patient.ID_user";
  try {
    db.query(q, (err, data) => {
      if (err) return next(err);
      return res.status(200).send(data);
    });
  } catch (err) {
    next(err);
  }
};

export const getDoctorPatient = async (req, res, next) => {
  const q = "SELECT u.ID_user, p.ID_patient, u.first_name, u.last_name, q.latest_date, p.status FROM user u JOIN patient p ON u.ID_user = p.ID_user JOIN ( SELECT ID_patient, MAX(date) AS latest_date FROM questionnaire GROUP BY ID_patient ) q ON p.ID_patient = q.ID_patient where ID_medecin = ?";
  try {
    const ID_medecin = await getMedecinID(req.user.ID_user);
    db.query(q, [ID_medecin], (err, data) => {
      if (err) return next(err);
      return res.status(200).send(data);
    });
  } catch (err) {
    next(err);
  }

}

export const getPatientStats = (req, res, next) => {
  const q = 'select count(status) AS nombre, status from patient group by status';
  try {
    db.query(q, (err, data) => {
      if (err) return next(err)
      return res.status(200).send(data)
    })
  } catch (err) {
    next(err)
  }
}

export const getPatientStatsDetail = (req, res, next) => {
  const type = req.params.type
  if (type === 'new') {
    const q = "SELECT count(ID_patient) AS count, monthname(status_date) AS month FROM patient WHERE status = 'new' GROUP BY month ,Month(status_date) ORDER by Month(status_date)"
    try {
      db.query(q, (err, data) => {
        if (err) return next(err)
        return res.status(200).send(data)
      })
    } catch (err) {
      next(err)
    }
  }
  if (type === 'healing') {
    const q = "SELECT count(ID_patient) AS count, monthname(status_date) AS month FROM patient WHERE status = 'healing' GROUP BY month ,Month(status_date) ORDER by Month(status_date)"
    try {
      db.query(q, (err, data) => {
        if (err) return next(err)
        return res.status(200).send(data)
      })
    } catch (err) {
      next(err)
    }
  }
  if (type === 'recovered') {
    const q = "SELECT count(ID_patient) AS count, monthname(status_date) AS month FROM patient WHERE status = 'recovered' GROUP BY month ,Month(status_date) ORDER by Month(status_date)"
    try {
      db.query(q, (err, data) => {
        if (err) return next(err)
        return res.status(200).send(data)
      })
    } catch (err) {
      next(err)
    }
  }
}

export const getPatient = (req, res, next) => {
  const q =
    "SELECT * FROM user, patient WHERE user.ID_user = patient.ID_user AND user.ID_user = ?";
  try {
    db.query(q, [req.params.id], (err, data) => {
      if (err) return next(err);
      return res.status(200).send(data);
    });
  } catch (err) {
    next(err);
  }
};

export const updatePatient = (req, res, next) => {
  const q = "UPDATE user SET ? WHERE ID_User = ?";
  try {
    db.query(q, [req.body, req.params.id], (err) => {
      if (err) return next(err);
      return res.status(200).send("Patient updated successfully!");
    });
  } catch (err) {
    next(err);
  }
};

export const deletePatient = (req, res, next) => {
  const q = "DELETE FROM patient WHERE ID_user = ?";
  try {
    db.query(q, [req.params.id], (err) => {
      if (err) return next(err);
      return res.status(200).send("Patient deleted successfully!");
    });
  } catch (err) {
    next(err);
  }
};
