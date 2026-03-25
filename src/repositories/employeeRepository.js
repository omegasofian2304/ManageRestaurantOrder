/*
Author : Sofian Hussein, Léo del Duca, Milo Soupper, Rodrigo Silva Riço
Date : 24.03.2026
Title : employeeRepository.js
Desc : Database queries for employees
*/

import pool from "../config/db.js";


export async function findAllEmployeesRepository() {
    const [result] = await pool.execute('SELECT id, first_name, last_name, email, post FROM employee')
    return result
}


export async function findEmployeeByIDRepository(id) {
    const [result] = await pool.execute(
        'SELECT id, first_name, last_name, email, post FROM employee where id=?',
        [id]
    )
    return result[0] ?? null
}