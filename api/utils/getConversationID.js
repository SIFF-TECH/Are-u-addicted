import { db } from "../db.js";
import { query } from "./promiseQuery.js";

const getConversationID = async (ID) => {
    const q = "select ID_converation from conversation where ID_patient = ?"
    try {
         const data = await query(q, ID)
         return data[0].ID_converation;
    } catch (err) {
        console.log(err)
    }
}

export default getConversationID;
