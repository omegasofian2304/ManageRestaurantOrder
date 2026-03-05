/*
Author : Sofian Hussein
Date : 04.03.2026
Title : mealRepository.js
Desc : Database queries for meals
*/
import pool from "../config/db.js";

export async function createMeal(name, price, description = null) {
    const [result] = await pool.execute(
        'INSERT INTO meal (name, price, description, is_available) VALUES (?, ?, ?, 1)',
        [name, price, description]
    )
    return { id: result.insertId, name, price, description, is_available: 1 }
}


export async function findMealByName(name) {
    const [result] = await pool.execute(
        'Select * from meal where name=?',
        [name]
    )
    return result[0] ?? null
}
