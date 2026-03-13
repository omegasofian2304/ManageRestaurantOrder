import pool from "../config/db.js";

export const createOrder = async (order) => {
    const { clientName, served, price, employee_id } = order;

    const [result] = await pool.execute(
        `INSERT INTO customer_order
     (client_name, order_served, total_price, employee_id)
     VALUES (?, ?, ?, ?)`,
        [clientName, served, price, employee_id]
    );

    return { id: result.insertId, ...order };
};


export const findMealsByOrderId = async (orderId) => {
    const [rows] = await pool.execute(
        `SELECT m.id AS meal_id, m.name, m.price AS unit_price, ohm.quantity
         FROM order_has_meal as ohm
         JOIN meal m ON m.id = ohm.meal_id
         WHERE ohm.order_id = ?`,
        [orderId]
    )
    return rows
}


export const findOrderById = async (id) => {

        const [result] = await pool.execute(
            'Select * from customer_order where id=?',
            [id]
        )
        return result[0] ?? null
}


export const findOrderWithMeals = async (id) => {
    const [rows] = await pool.query(
        `SELECT * FROM order_has_meal
         WHERE order_id = ?`,
        [id]
    );

    return rows; // tableau vide [] si pas de meals
};


export const serveOrder = async (id) => {
    const [result] = await pool.execute(
        `UPDATE customer_order
         SET order_served = 1
         WHERE id = ?`,
        [id]
    );

    return result.affectedRows > 0;
};

export const findAllOrder = async () => {
    const [rows] = await pool.execute('SELECT * FROM customer_order');
    return rows.length > 0 ? rows : null;
}

export const addMealToAnOrderRepository = async (id) => {

}