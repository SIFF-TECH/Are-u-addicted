import { db } from "../db.js";
import { query } from "./promiseQuery.js";

const getPatientID = async (ID) => {
    const q = `select ID_patient from patient where ID_user = ${ID}`;
    try {
         const data = await query(q, ID)
         return data[0]?.ID_patient
    } catch (err) {
        console.log(err)
    }
}

export default getPatientID;