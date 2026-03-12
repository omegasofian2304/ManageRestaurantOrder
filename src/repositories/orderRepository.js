import db from "../config/db.js";

export const createOrder = async (order) => {
    const { clientName, served, price, employee_id } = order;

    const [result] = await db.query(
        `INSERT INTO customer_order
     (client_name, order_served, total_price, employee_id)
     VALUES (?, ?, ?, ?)`,
        [clientName, served, price, employee_id]
    );

    return { id: result.insertId, ...order };
};

export const findOrderById = async (id) => {
    const [rows] = await db.query(
        `SELECT id, client_name, creation_date, order_served, total_price, employee_id
         FROM customer_order
         WHERE id = ?`,
        [id]
    )
    return rows[0] || null
}

export const findMealsByOrderId = async (orderId) => {
    const [rows] = await db.query(
        `SELECT m.id AS meal_id, m.name, m.price AS unit_price, ohm.quantity
         FROM order_has_meal as ohm
         JOIN meal m ON m.id = ohm.meal_id
         WHERE ohm.order_id = ?`,
        [orderId]
    )
    return rows
}
