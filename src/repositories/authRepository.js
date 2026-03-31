/*
Author : Sofian Hussein, Léo del Duca, Milo Soupper, Rodrigo Silva Riço
Date : 18.03.2026
Title : authRepository.js
Desc : Database queries for auth
*/

import pool from "../config/db.js";

export async function findEmployeeByEmailRepository(email) {
    const [result] = await pool.query(
        `SELECT * FROM employee WHERE email = ?`, [email]
    )
    return result[0] ?? null
}