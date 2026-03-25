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

export const createEmployeeRepository = async (employee) => {
    const { firstname, lastname, email, password ,post} = employee;

    const [result] = await pool.execute(
        `INSERT INTO employee (first_name, last_name, email, password, post) VALUES (?, ?, ?, ?, ?)`,
        [firstname, lastname, email, password,post]
    );

    return "successfuly created employee";
}

export async function updateEmployeeRepository(id, firstname = null,lastname = null,email = null, post = null) {
    const fieldsValue = []
    const fieldsName = []

    if (firstname !== null) {
        fieldsValue.push(firstname)
        fieldsName.push('first_name = ?')
    }

    if (lastname !== null) {
        fieldsValue.push(lastname)
        fieldsName.push('last_name = ?')
    }

    if (email !== null) {
        fieldsValue.push(email)
        fieldsName.push('email = ?')
    }

    if (post !== null) {
        fieldsValue.push(post)
        fieldsName.push('post = ?')
    }


    if (fieldsName.length === 0) {
        throw new Error('No fields were updated')
    }

    fieldsValue.push(id)

    const [result] = await pool.execute(
        `UPDATE employee SET ${fieldsName.join(', ')} WHERE id = ?`,
        fieldsValue
    )

    return findEmployeeByIDRepository(id)
}


