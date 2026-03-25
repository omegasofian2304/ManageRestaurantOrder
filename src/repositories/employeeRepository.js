import pool from "../config/db.js";

export const createEmployeeRepository = async (employee) => {
    const { firstname, lastname, email, password ,post} = employee;

    const [result] = await pool.execute(
        `INSERT INTO employee
     (first_name, last_name, email, password, post)
     VALUES (?, ?, ?, ?)`,
        [firstname, lastname, email, password,post]
    );

    return { id: result.insertId, ...employee };
};