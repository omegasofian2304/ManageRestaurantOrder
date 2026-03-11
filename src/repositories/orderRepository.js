/*
Author : Milo Soupper
Date : 04.03.2026
Title : orderRepository.js
Desc : File containing all sql request for the order table
*/
import db from "../config/db.js";
import pool from "../config/db.js";

export const createOrder = async (order) => {
    const { clientName, served, price, employee_id } = order;

    const [result] = await db.query(
        `INSERT INTO customer_order
     (client_name, order_served, total_price, employee_id)
     VALUES (?, ?, ?, ?)`,
        [clientName, served, price, employee_id]
    );

    return { id: result.insertId, ...order };
}
export const findAllOrder = async () => {
    const [rows] = await pool.execute('SELECT * FROM customer_order');
    return rows.length > 0 ? rows : null;
}
