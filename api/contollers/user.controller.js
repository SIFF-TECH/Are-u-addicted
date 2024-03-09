import { db } from "../db.js"


export const getUser = (req, res, next) => {
    const q = "select first_name, last_name, birth_date from user where ID_user = ?"
    try {
        db.query(q, [req.params.id], (err, data) => {
            if (err) return next(err);
            return res.status(200).send(data)
        })
    } catch (err) {
        next(err)
    }
}

