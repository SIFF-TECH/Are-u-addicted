import { db } from "../db.js";

export const addAnswer = (req, res, next) => {
  try {
    const q =
      "INSERT INTO answer( ID_questionnaire, ID_question, answer, points) VALUES(?, ?, ?, ?)";

    db.query(
      q,
      [
        req.body.ID_questionnaire,
        req.body.ID_question,
        req.body.answer,
        req.body.points
      ],
      (err, data) => {
        if (err) return next(err);
        return res.status(201).send("Answer add successfully!");
      }
    );
  } catch (err) {
    next(err);
  }
};

export const getAllAnswer = (req, res, next) => {
  try {
    const q = "SELECT * FROM answer WHERE ID_questionnaire = ?"

    db.query(q, [req.body.ID_questionnaire], (err, data) => {
      if (err) return next(err)
      return res.status(200).send(data);
    })
  } catch (err) {
    next(err)
  }
};
export const getAnswerQuestionnaire = (req, res, next) => {
  try {
    const q = "SELECT * FROM answer WHERE ID_questionnaire = ?"

    db.query(q, [req.params.id], (err, data) => {
      if (err) return next(err)
      return res.status(200).send(data);
    })
  } catch (err) {
    next(err)
  }
};


export const getPoints = (req, res, next) => {
  try {
    const q = "SELECT sum(points) as result, a.ID_questionnaire, date from answer a, questionnaire q where a.ID_questionnaire = q.ID_questionnaire and ID_patient = ? group by a.ID_questionnaire, date"
    db.query(q, [req.params.id], (err, data) => {
      if (err) return next(err)
      return res.status(200).send(data);
    });

  } catch (err) {
    next(err)
  }
};

export const updateAnswer = (req, res, next) => { };

export const deleteAnswer = (req, res, next) => { };
