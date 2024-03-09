import { db } from "../db.js";

import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
import { query } from "../utils/promiseQuery.js";

export const registerUser = (req, res, next) => {
  try {
    //CHECK EXISTING USER
    const q = "SELECT * FROM user WHERE last_name = ? OR email = ?";

    db.query(q, [req.body.last_name, req.body.email], (err, data) => {
      if (err) return next(err);
      if (data.length) return next(createError(409, "User alreay exist"));

      //Hash the password and create a user
      


      const q =
        "INSERT INTO user(first_name, last_name, birth_date, email, password) VALUES (?, ?, ?, ?, ?)";
      db.query(
        q,
        [
          req.body.first_name,
          req.body.last_name,
          req.body.birth_date,
          req.body.email,
          req.body.password,
        ],
        (err) => {
          if (err) return next(err);
          const q = "SELECT ID_user from user WHERE email = ?";
          db.query(q, [req.body.email], (err, data) => {
            if (err) return next(err);
            return res.status(201).json(data[0]);
          });
        }
      );
    });
  } catch (err) {
    next(err);
  }
};
export const registerPatient = (req, res, next) => {
  try {
    const q = "INSERT INTO patient(ID_user) VALUES(?)";

    db.query(q, [req.body.ID_user], (err, data) => {
      if (err) return next(err);
      return res.status(201).send("Patient created successfully!");
    });
  } catch (err) {
    next(err);
  }
};
export const registerMedecin = (req, res, next) => {
  try {
    const q =
      "INSERT INTO doctor( ID_user, speciality, experiences) VALUES(?, ?, ?)";

    db.query(
      q,
      [
        req.body.ID_user,
        req.body.speciality,
        req.body.experiences,
      ],
      (err, data) => {
        if (err) return next(err);
        const q = "INSERT INTO alert(ID_sender, type, content) VALUES(?, 'register', 'Has registred to the application')";
        db.query(q, [req.body.ID_user], (err, data) => {
          if (err) return next(err);
          return res.status(201).send("Doctor created successfully!");
        })
      }
    );
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  const q = "SELECT * from user WHERE email = ?";

  try {
    const userData = await query(q, [req.body.email]);

    if (userData.length === 0) {
      return next(createError(404, "User not found!"));
    }

    const isPasswordCorrect = req.body.password === userData[0].password;


    if (!isPasswordCorrect) {
      return next(createError(400, "Wrong username or password"));
    }

    const ID_user = userData[0].ID_user;
    let isMedecin = false;
    let isPatient = false;
    let isAdmin = false;

    const patientData = await query("SELECT * FROM patient WHERE ID_user = ?", [
      ID_user,
    ]);

    if (patientData.length === 0) {
      const doctorData = await query("SELECT * from doctor WHERE ID_user = ?", [
        ID_user,
      ]);

      if (doctorData.length) {
        if (doctorData[0].confirmed === 0) {
          return next(createError(406, "Your account is not confirmed yet!"))
        } else {
          isMedecin = true;
        }
      } else {
        isAdmin = true;
      }
    } else {
      isPatient = true;
    }

    const { password, ...userInfo } = userData[0];

    const token = jwt.sign(
      {
        ID_user: userData[0].ID_user,
        isPatient: isPatient,
        isMedecin: isMedecin,
        isAdmin: isAdmin,
      },
      process.env.JWT_TOKEN
    );

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send({ userInfo, isAdmin, isMedecin, isPatient });
  } catch (err) {
    return next(err);
  }
};

export const logout = (req, res, next) => {
  res
    .cookie("accessToken", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(1),
    })
    .status(200)
    .send("User has been logged out!");
};
