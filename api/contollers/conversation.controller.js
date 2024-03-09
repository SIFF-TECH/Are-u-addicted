import { db } from "../db.js";
import getMedecinID from "../utils/getMedecinID.js";


export const addConversation = async (req, res, next) => {
    const q = "INSERT into conversation(ID_medecin, ID_patient, last_message) VALUES (?, ?, ?)"

    try {
        db.query(q, [req.body.ID_medecin, req.body.ID_patient, req.body.last_message], (err, data) => {
            if (err) return next(err)
            return res.status(201).send("Conversation add seccussfully!");
        })
    } catch (err) {
        next(err)
    }
    
  };

export const getConversation = async (req, res, next) => {
    const q = "select first_name, last_name, ID_converation, c.ID_medecin, c.ID_patient, c.last_message from conversation c, patient p, user u where c.ID_patient = p.ID_patient and p.ID_user = u.ID_user and c.ID_medecin = ?"

    try {
        const ID_medecin = await getMedecinID(req.user.ID_user);
        db.query(q, [ID_medecin], (err, data) => {
            if (err) return next(err);
            res.status(200).send(data)
        })

    } catch (err) {
        next(err)
    }
    
  };

export const getOneConversation = async (req, res, next) => {
    try {
        const ID_medecin = await getMedecinID(req.user.ID_user)
        const q = "SELECT ID_converation from conversation WHERE ID_medecin = ? and ID_patient = ?"
        db.query(q, [ID_medecin, req.params.id], (err, data) => {
            if (err) return next(err)
            return res.status(200).send(data)
        })
    } catch(err) {
        next(err)
    }

}