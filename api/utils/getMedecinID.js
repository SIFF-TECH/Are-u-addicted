import { db } from "../db.js";
import { query } from "./promiseQuery.js";

const getMedecinID = async (ID) => {
    const q = `select ID_medecin from doctor where ID_user = ${ID}`;
    try {
         const data = await query(q, ID)
         return data[0]?.ID_medecin
    } catch (err) {
        console.log(err)
    }
}

export default getMedecinID;