/*
Author : Sofian Hussein, Léo del Duca, Milo Soupper, Rodrigo Silva Riço
Date : 04.03.2026
Title : orderRepository.js
Desc : Database queries for orders
*/
import pool from "../config/db.js";

export const createOrderRepository = async (order) => {
    const { clientName, served, price, employee_id } = order;

    const [result] = await pool.execute(
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


export const findMealsByOrderIdRepository = async (orderId) => {
    const [rows] = await pool.execute(
        `SELECT m.id AS meal_id, m.name, m.price AS unit_price, ohm.quantity
         FROM order_has_meal as ohm
         JOIN meal m ON m.id = ohm.meal_id
         WHERE ohm.order_id = ?`,
        [orderId]
    )
    return rows
}


export const findOrderByIdRepository = async (id) => {

    const [result] = await pool.execute(
        `SELECT co.*, e.first_name, e.last_name
         FROM customer_order co
         JOIN employee e ON e.id = co.employee_id
         WHERE co.id = ?`,
        [id]
    )
    return result[0] ?? null
}


export const findOrderWithMealsRepository = async (id) => {
    const [rows] = await pool.query(
        `SELECT * FROM order_has_meal
         WHERE order_id = ?`,
        [id]
    );

    return rows;
};


export const serveOrderRepository = async (id) => {
    const [result] = await pool.execute(
        `UPDATE customer_order
         SET order_served = 1
         WHERE id = ?`,
        [id]
    );

    return result.affectedRows > 0;
};

export const getAllOrdersRepository = async (orderServed) => {
    if (orderServed !== undefined) {
        const [rows] = await pool.execute(
            `SELECT co.*, e.first_name, e.last_name
             FROM customer_order co
             JOIN employee e ON e.id = co.employee_id
             WHERE co.order_served = ?
             ORDER BY co.creation_date DESC`,
            [orderServed]
        )
        return rows.length > 0 ? rows : null
    }

    const [rows] = await pool.execute(
        `SELECT co.*, e.first_name, e.last_name
         FROM customer_order co
         JOIN employee e ON e.id = co.employee_id
         ORDER BY co.creation_date DESC`
    )
    return rows.length > 0 ? rows : null
}

export const addMealToAnOrderRepository = async (orderId, mealId, quantity) => {
    await pool.execute(
        `INSERT INTO order_has_meal (order_id, meal_id, quantity) VALUES (?, ?, ?)`,
        [orderId, mealId, quantity]
    )
}

export const updateMealQuantityRepository = async (orderId, mealId, mealQuantity) => {
    const [result] = await pool.execute(
        `UPDATE order_has_meal
        SET quantity = ? where order_id = ? and meal_id = ?`, [mealQuantity, orderId, mealId]
    );

    return result;
}

export const updateOrderPriceRepository = async (orderId, totalPrice) => {
    const [result] = await pool.execute(
        `UPDATE customer_order
        SET total_price = ?
        where id = ?`, [totalPrice, orderId]
    )
}


export const removeMealFromOrderRepository = async (orderId, mealId) => {
    await pool.execute(
        'DELETE FROM order_has_meal where order_id = ? and meal_id = ?', [orderId, mealId]
    )
}

export const deleteOrderRepository = async (id) => {
    await pool.execute(
        'DELETE FROM customer_order WHERE id = ?',
        [id]
    )
}