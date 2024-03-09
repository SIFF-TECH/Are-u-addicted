import mysql from "mysql2";


export const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "11052004bba",
    database: "healthquest",
    port: "3306",
    dateStrings: true,
  });