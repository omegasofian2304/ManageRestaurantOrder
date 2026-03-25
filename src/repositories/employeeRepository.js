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


export async function updateEmployeeRepository(id, firstname = null,lastname = null,email = null, post = null) {
    const fieldsValue = []
    const fieldsName = []

    if (firstname !== null) {
        fieldsValue.push(firstname)
        fieldsName.push('firstname = ?')
    }

    if (lastname !== null) {
        fieldsValue.push(lastname)
        fieldsName.push('lastname = ?')
    }

    if (email !== null) {
        fieldsValue.push(email)
        fieldsName.push('email = ?')
    }

    if (post !== null) {
        fieldsValue.push(post)
        fieldsName.push('post = ?')
    }

    //Pour éviter qu'un update soit vide (donc qu'on ne change rien)
    if (fieldsName.length === 0) {
        throw new Error('Aucun champ a été mis à jour')
    }

    fieldsValue.push(id)

    const [result] = await pool.execute(
        `UPDATE employee SET ${fieldsName.join(', ')} WHERE id = ?`,
        fieldsValue
    )

    return findEmployeeByIDRepository(id)
}