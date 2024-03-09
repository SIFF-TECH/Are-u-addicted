import { db } from "../db.js";

export const addQuestion = (req, res, next) => {
  const q =
    "INSERT INTO question(ID_Question, question_text, type, answer_options, point, question_order) VALUES(?, ?, ?, ?, ?, ?)";
  try {
    db.query(
      q,
      [
        req.body.ID_Question,
        req.body.question_text,
        req.body.type,
        req.body.answer_options,
        req.body.point,
        req.body.question_order,
      ],
      (err) => {
        if (err) return next(err);
        return res.status(201).json("Question created successfully!");
      }
    );
  } catch (err) {
    next(err);
  }
};

export const getAllQuestion = (req, res, next) => {
  const q = "SELECT * FROM question";
  try {
    db.query(q, (err, data) => {
      if (err) return next(err);
      return res.status(200).json(data);
    });
  } catch (err) {
    next(err);
  }
};

export const getQuestion = (req, res, next) => {
  const q = "SELECT * FROM question WHERE ID_Question = ?";
  try {
    db.query(q, [req.params.id], (err, data) => {
      if (err) return next(err);
      return res.status(200).json(data);
    });
  } catch (err) {
    next(err);
  }
};

export const updateQuestion = (req, res, next) => {
  const q = "UPDATE question SET ? WHERE ID_Question = ?";
  try {
    db.query(q, [req.body, req.params.id], (err) => {
      if (err) return next(err);
      return res.status(200).send("Question updated successfully!");
    });
  } catch (err) {
    next(err);
  }
};

export const deleteQuestion = (req, res, next) => {
  const q = "DELETE FROM question WHERE ID_Question = ?";
  try {
    db.query(q, [req.params.id], (err) => {
      if (err) return next(err);
      return res.status(200).send("Question deleted successfully!");
    });
  } catch (err) {
    next(err);
  }
};
