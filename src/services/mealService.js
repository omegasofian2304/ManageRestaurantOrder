/*
Author : Sofian Hussein
Date : 04.03.2026
Title : mealRepository.js
Desc : Business logic for meal
*/
import {
    createMealRepository,
    findMealByNameRepository,
    findMealByIDRepository,
    updateMealRepository,
    findAllMealsRepository,
    findMealInActiveOrderRepository, deleteMealRepository
} from "../repositories/mealRepository.js"

export async function createMealService(name, price, description = null) {
    const existingMeal = await findMealByNameRepository(name)
    if (existingMeal) {
        const error = new Error('A meal with this name already exists')
        error.status = 409
        throw error
    }

    // round the price for having only 2 decimals
    const roundedPrice = Math.round(price * 100) / 100

    return await createMealRepository(name, roundedPrice, description)
}

export async function updateMealService(id, name=null, price=null, description=null, is_available=null) {
    const existingMeal = await findMealByIDRepository(id)
    if (!existingMeal) {
        const error = new Error('A meal with this id does not exist')
        error.status = 404
        throw error
    }

    if (name && await findMealByNameRepository(name)) {
        const error = new Error('A meal with this name already exists')
        error.status = 409
        throw error
    }

    return await updateMealRepository(id, name, price, description, is_available)

}

export async function findAllMealsService(isAvailable) {
    return await findAllMealsRepository(isAvailable);
}

export async function findMealByIDService(id) {
    return await findMealByIDRepository(id);
}

export async function deleteMealService(id) {
    const mealInActiveOrder = await findMealInActiveOrderRepository(id)

    if (mealInActiveOrder) {
        const error = new Error('Meal is in an active order')
        error.status = 409
        throw error
    }

    await deleteMealRepository(id)
}