/*
Author : Sofian Hussein
Date : 04.03.2026
Title : mealRepository.js
Desc : Business logic for meal
*/
import { createMeal, findMealByName } from "../repositories/mealRepository.js"

export async function addMeal(name, price, description = null) {
    const existingMeal = await findMealByName(name)
    if (existingMeal) {
        const error = new Error('A meal with this name already exists')
        error.status = 409
        throw error
    }

    // round the price for having only 2 decimals
    const roundedPrice = Math.round(price * 100) / 100

    return await createMeal(name, roundedPrice, description)
}