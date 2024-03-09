import { db } from "../db.js";
import getPatientID from "../utils/getPatientID.js";
import { query } from "../utils/promiseQuery.js";

export const addQuestionnaire = async (req, res, next) => {
  try {
    const ID_patient = await getPatientID(req.user.ID_user)
    const q = "select * from patient where ID_patient = ?"
    const patientInfo = await query(q, ID_patient);
    const q1 = "select * from questionnaire where ID_patient = ?"
    const questionnaireInfo = await query(q1, ID_patient)
    if (questionnaireInfo.length > 0 && patientInfo[0].retest === 0) {
      return res.status(406).send("You have already took the quiz!")
    }

    const q3 = "INSERT INTO questionnaire(ID_patient, date) VALUES (?, ?)"
    db.query(q3, [ID_patient, req.body.date], (err, data) => {
      if (err) return next(err)
      const q = "SELECT * FROM questionnaire WHERE ID_patient = ? ORDER BY ID_questionnaire DESC";

      db.query(q, [ID_patient], (err, data) => {
        if (err) return next(err);
        res.status(201).json(data[0]);
      });
    })

  } catch (err) {

  }
};

export const submitQuestionnaire = async (req, res, next) => {
  try {
    const ID_patient = await getPatientID(req.user.ID_user)
    const age = req.body.age
    const q = "select * from doctor where confirmed = 1"
    const doctors = await query(q)
    const q2 = "UPDATE patient SET status = 'healing', status_date = CURRENT_TIMESTAMP, retest = 0 WHERE ID_patient = ?"
    const updated = await query(q2, ID_patient);
    const filtredDoctors = doctors.filter(doc => {
      if (age <= 10) {
        return doc.experiences >= 2;
      } else if (age > 10 && age <= 20) {
        return doc.experiences >= 5;
      } else if (age > 20 && age <= 30) {
        return doc.experiences >= 10;
      } else {
        return doc.experiences >= 15;
      }
    })
    const chosenDoctor = filtredDoctors[0]
    const q1 = "UPDATE patient SET ID_medecin = ? WHERE ID_patient = ?"
    db.query(q1, [chosenDoctor?.ID_medecin, ID_patient], (err, data) => {
      if (err) return next(err);
      const q = "INSERT INTO conversation(ID_medecin, ID_patient) VALUES(?, ?)"

      db.query(q, [chosenDoctor?.ID_medecin, ID_patient], (err, data) => {
        if (err) return next(err)

        const q = "INSERT INTO alert(ID_sender, ID_receiver, type, content) VALUES(?, ?, 'new', 'Is your new patient.')";
        db.query(q, [req.user.ID_user, chosenDoctor?.ID_user], (err, data) => {
          if (err) return next(err)
          res.status(200).send("Patient has submit it questionnaire successfully!")
        })
      })
    })

  } catch (err) {
    next(err)
  }
}

export const retestQuestionnaire = async (req, res, next) => {
  try {
    const ID_patient = await getPatientID(req.user.ID_user)
    console.log(ID_patient)
    const q = "SELECT * FROM patient WHERE ID_patient = ?"
    const patientInfo = await query(q, ID_patient);
    const q1 = "SELECT ID_user from doctor WHERE ID_medecin = ?"
    const medecinInfo = await query(q1, patientInfo[0].ID_medecin)
    const q3 = "INSERT INTO alert(ID_sender, ID_receiver, type, content) VALUES(?, ?, 'retest', 'want to re-test the quiz.')";
    db.query(q3, [req.user.ID_user, medecinInfo[0]?.ID_user], (err, data) => {
      if (err) return next(err)
      res.status(200).send("Notification sent successfully!")
    })
  } catch (err) {
    next(err)
  }
}

export const acceptRetest = async (req, res, next) => {
  try {
    const ID_patient = await getPatientID(req.body.ID_user);
    const q = "UPDATE patient SET retest = 1 WHERE ID_patient = ?"
    db.query(q, [ID_patient], (err, data) => {
      if (err) next(err)

      const q = "INSERT INTO alert(ID_sender, ID_receiver, type, content) VALUES(?, ?, 'approve', 'Accepted your request to the re-test')"
      db.query(q, [req.user.ID_user, req.body.ID_user], (err, data) => {
        if (err) return next(err)
        return res.status(200).send("Request accepted successfully!")
      })
    })
  } catch (err) {
    next(err)
  }
}

export const getAllQuestionnaire = (req, res, next) => {
  try {
    const q = "SELECT * FROM questionnaire";

    db.query(q, (err, data) => {
      if (err) return next(err);
      res.status(201).json(data);
    });
  } catch (err) {
    next(err);
  }
};

export const getQuestionnaire = (req, res, next) => {
  try {
    const q = "SELECT ID_patient from patient WHERE ID_user = ?";

    db.query(q, [req.params.id], (err, data) => {
      if (err) next(err);
      const patientID = data[0]?.ID_patient;

      const q = "SELECT * FROM questionnaire WHERE ID_patient = ?";

      db.query(q, [patientID], (err, data) => {
        if (err) return next(err);
        res.status(201).json(data);
      });
    });
  } catch (err) {
    next(err);
  }
};

export const updateQuestionnaire = (req, res, next) => {
  const q = "UPDATE questionnaire SET ? WHERE ID_Questionnaire = ?";
  try {
    db.query(q, [req.body, req.params.id], (err) => {
      if (err) return next(err);
      return res.status(200).send("Questionnaire updated successfully!");
    });
  } catch (err) {
    next(err);
  }
};

export const deleteQuestionnaire = (req, res, next) => {
  const q = "DELETE FROM questionnaire WHERE ID_questionnaire = ?";
  try {
    db.query(q, [req.params.id], (err) => {
      if (err) return next(err);
      return res.status(200).send("Questionnaire deleted successfully!");
    });
  } catch (err) {
    next(err);
  }
};
