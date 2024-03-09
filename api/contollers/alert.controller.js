import { db } from "../db.js";


export const addAlert = (req, res, next) => {
    if (!req.body.ID_receiver) {
        const q = "INSERT INTO alert(ID_sender, type, content) VALUES(?, ?, ?)"
        try{
            db.query(q, [req.body.ID_sender, req.body.type, req.body.content], (err, data) =>{
                if (err) return next(err)
                res.status(201).send("Alert has been add succussfully!!")
            })
        } catch (err) {
            next(err)
        }
    } else {
        const q = "INSERT INTO alert(ID_sender, ID_receiver, type, content) VALUES(?, ?, ?, ?)"
        try{
            db.query(q, [req.user.ID_user, req.body.ID_receiver, req.body.type, req.body.content], (err, data) =>{
                if (err) return next(err)
                res.status(201).send("Alert has been add succussfully!!")
            })
        } catch (err) {
            next(err)
        }
    }
};


export const getAlert = (req, res, next) => {
    if (req.user.isAdmin) {
        const q = "SELECT first_name, last_name, ID_alert, ID_receiver, ID_sender, content, type FROM alert, user WHERE ID_sender=user.ID_user and type = 'register' and seen = 0 ORDER BY ID_alert DESC"
        try {
            db.query(q, (err, data) => {
                if (err) return next(err);
                return res.status(200).send(data)
            })
        } catch (err) {
            next(err)
        }
    } else {
        const q = "SELECT first_name, last_name, ID_alert, ID_receiver, ID_sender, content, type FROM alert, user WHERE ID_sender=user.ID_user and ID_receiver = ? and seen = 0 ORDER BY ID_alert DESC"
        try {
            db.query(q, [req.user.ID_user], (err, data) => {
                if (err) return next(err);
                return res.status(200).send(data)
            })
        } catch (err) {
            next(err)
        }
    }
    
  };

  export const updateAlert = (req, res, next) => {
    const q = "UPDATE alert set seen = 1 WHERE ID_alert = ?"
    try {
        db.query(q, [req.params.id], (err, data) => {
            if (err) return err
            return res.status(200).send("Alert updated successfully!")
        })
    } catch (err) {
        next(err)
    }
  }