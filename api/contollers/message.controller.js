import { db } from "../db.js";
import getConversationID from "../utils/getConversationID.js";
import getPatientID from "../utils/getPatientID.js";

export const addMessage = async (req, res, next) => {
  const q =
    "INSERT INTO message(ID_conversation, ID_User, content) VALUES(?, ?, ?)";
  let ID_conversation;
  if (req.user.isPatient) {
    const patientID = await getPatientID(req.user.ID_user);
    ID_conversation = await getConversationID(patientID);
  } else {
    ID_conversation = req.body.ID_conversation
  }
  try {
    db.query(
      q,
      [
        ID_conversation,
        req.user.ID_user,
        req.body.content,
      ],
      (err, data) => {
        if (err) return next(err);
        const q = "UPDATE conversation SET last_message = ? WHERE ID_converation = ?"
        db.query(q, [req.body.content, ID_conversation], (err, data) => {
          if (err) return next(err)
          res.status(201).send("Message add successfully!")
        })
      }
    );
  } catch (err) {
    next(err);
  }
};

export const getPatientMessage = async (req, res, next) => {
  if (req.user.isPatient) {
    try {
      const patientID = await getPatientID(req.user.ID_user);
      const conversationID = await getConversationID(patientID);
      const q = "select DISTINCT first_name, last_name, ID_message, m.ID_conversation, m.ID_user, content from message m, conversation c, patient p, doctor d, user u where m.ID_conversation = c.ID_converation and c.ID_medecin = d.ID_medecin and d.ID_user = u.ID_user and c.ID_patient = ? and ID_conversation = ? ORDER BY ID_message ASC"
      db.query(q, [patientID, conversationID], (err, data) => {
        if (err) return next(err)
        res.status(200).send(data)
      })
    } catch (err) {
      next(err)
    }
  }
};

export const getMessage = async (req, res, next) => {
  const ID_patient = req.query.patient;
  try {
    const q = "select first_name, last_name, ID_message, content, dispatch_date, m.ID_user, ID_conversation from message m, patient p, user u, conversation c where m.ID_conversation = c.ID_converation and c.ID_patient = p.ID_patient and p.ID_user = u.ID_user and p.ID_patient = ? and ID_conversation = ?"
    db.query(q, [ID_patient, req.params.id], (err, data) => {
      if (err) return next(err)
      res.status(200).send(data)
    })
  } catch (err) {
    next(err)
  }
}

