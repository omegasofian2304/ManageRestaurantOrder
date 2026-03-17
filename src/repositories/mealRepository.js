/*
Author : Sofian Hussein
Date : 04.03.2026
Title : mealRepository.js
Desc : Database queries for meals
*/
import pool from "../config/db.js";

export async function createMealRepository(name, price, description = null) {
    const [result] = await pool.execute(
        'INSERT INTO meal (name, price, description, is_available) VALUES (?, ?, ?, 1)',
        [name, price, description]
    )
    return { id: result.insertId, name, price, description, is_available: 1 }
}


export async function findMealByNameRepository(name) {
    const [result] = await pool.execute(
        'Select * from meal where name=?',
        [name]
    )
    return result[0] ?? null
}

export async function findMealByIDRepository(id) {
    const [result] = await pool.execute(
        'Select * from meal where id=?',
        [id]
    )
    return result[0] ?? null
}

export async function updateMealRepository(id, name =null, price= null, description= null, is_available= null) {
    const fieldsValue = []
    const fieldsName = []

    if (name !== null) { fieldsValue.push(name); fieldsName.push('name = ?') }
    if (price !== null) { fieldsValue.push(price); fieldsName.push('price = ?')  }
    if (description !== null) { fieldsValue.push(description); fieldsName.push('description = ?')  }
    if (is_available != null) { fieldsValue.push(is_available); fieldsName.push('is_available = ?')  }

    fieldsValue.push(id)

    const [result] = await pool.execute(
        `Update meal SET ${fieldsName.join(',')} where id=?`,
        fieldsValue
    )
    return findMealByIDRepository(id)
}

export async function findAllMealsRepository(isAvailable = undefined) {
    if (isAvailable !== undefined) {
        const [result] = await pool.execute(
            'SELECT * FROM meal WHERE is_available = ?',
            [isAvailable]
        )
        return result
    }
    const [result] = await pool.execute('SELECT * FROM meal')
    return result
}

export async function findMealInActiveOrderRepository(id) {
    const [result] = await pool.execute(
        `SELECT ohm.meal_id FROM order_has_meal ohm
         JOIN customer_order co ON co.id = ohm.order_id
         WHERE ohm.meal_id = ? AND co.order_served = 0`,
        [id]
    )
    return result[0] ?? null
}

export async function deleteMealRepository(id) {
    await pool.execute(
        'DELETE FROM meal WHERE id = ?',
        [id]
    )
}