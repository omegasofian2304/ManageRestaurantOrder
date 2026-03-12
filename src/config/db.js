/*
Author : Sofian Hussein
Date : 04.03.2026
Title : db.js
Desc : This file contains the pool for the db
*/
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

export default pool;