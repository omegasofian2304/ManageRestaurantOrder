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
