/*
Author : Milo Soupper
Date : 04.03.2026
Title : orderRepository.js
Desc : Business logic for the order table
*/

import {
    addMealToAnOrderRepository,
    getAllOrdersRepository as findAllOrders,
    updateMealQuantityRepository, updateOrderPriceRepository,
    removeMealFromOrderRepository as removeMealFromOrderRepository, deleteOrderRepository, getAllOrdersRepository,
} from "../repositories/orderRepository.js";
import { createOrderRepository as createOrderRepository, serveOrderRepository as serveOrderRepository } from "../repositories/orderRepository.js";
import { findOrderByIdRepository as findOrderByIdRepository } from "../repositories/orderRepository.js";
import { findOrderWithMealsRepository as findOrderWithMealsRepository} from "../repositories/orderRepository.js";
import { findMealsByOrderIdRepository} from "../repositories/orderRepository.js";
import {findMealByID} from "../repositories/mealRepository.js";

export const createOrderService = async (data) => {
    return createOrderRepository(data);
}

export const getAllOrdersService = async () => {
        return getAllOrdersRepository();
    };

export const findOrderByIdService = async (id) => {
    return findOrderByIdRepository(id);
}


export const findOrderWithMealsService = async (id) => {
    return findOrderWithMealsRepository(id);
}

export const serveOrderService = async (id) => {
    return await serveOrderRepository(id);
};

export const getOrderDetailService = async (id) => {
    const order = await findOrderByIdService(id)

    if (!order) {
        const error = new Error("Order not found")
        error.status = 404
        throw error
    }
    const meals = await findMealsByOrderIdRepository(id)

    const total_price = order.total_price

    return {
        id: order.id,
        client_name: order.client_name,
        creation_date: order.creation_date,
        order_served: order.order_served,
        employee_id: order.employee_id,
        total_price: parseFloat(total_price.toFixed(2)),
        meals: meals.map(m => ({
            meal_id: m.meal_id,
            name: m.name,
            unit_price: parseFloat(m.unit_price),
            quantity: m.quantity
        }))
    }
}

export async function addMealToAnOrderService(meals, orderId) {
    const order = await findOrderByIdService(orderId);

    if (!order) {
        const error = new Error("Order not found")
        error.status = 404
        throw error
    }

    if (order.order_served) {
        const error = new Error("Order is already served")
        error.status = 409
        throw error
    }

    const dbMeals = []

    // Fetch meals from DB and check availability
    for (const meal of meals) {
        const dbMeal = await findMealByID(meal.id)
        if (!dbMeal) {
            const error = new Error(`Meal ${meal.id} not found`)
            error.status = 404
            throw error
        }
        if (!dbMeal.is_available) {
            const error = new Error(`${dbMeal.name} is not available`)
            error.status = 422
            throw error
        }
        // Spread all DB meal properties and add quantity from request body
        dbMeals.push({...dbMeal, quantity: meal.quantity})
    }

    // Merge duplicate meals from the request
    const mergedMeals = []
    for (const meal of dbMeals) {
        const existing = mergedMeals.find(m => m.id === meal.id)
        if (existing) {
            existing.quantity += meal.quantity
        } else {
            mergedMeals.push({...meal})
        }
    }

    const orderMeals = await findMealsByOrderIdRepository(orderId)

    for (const meal of mergedMeals) {
        const existing = orderMeals.find(om => om.meal_id === meal.id)
        if (existing) {
            await updateMealQuantityRepository(orderId, meal.id, existing.quantity + meal.quantity)
        } else {
            await addMealToAnOrderRepository(orderId, meal.id, meal.quantity)
        }
    }

    // Recalculate total price
    const updatedMeals = await findMealsByOrderIdRepository(orderId)
    let totalPrice = 0

    for (const meal of updatedMeals) {
        totalPrice += meal.unit_price * meal.quantity
    }

    totalPrice = Math.round(totalPrice * 100) / 100

    await updateOrderPriceRepository(orderId, totalPrice)
}

export async function updateMealQuantityService(orderId, mealId, quantity) {
    const order = await findOrderByIdService(orderId);

    if (!order) {
        const error = new Error("Order not found")
        error.status = 404
        throw error
    }

    if (order.order_served) {
        const error = new Error("Order is already served")
        error.status = 409
        throw error
    }

    const orderMeals = await findMealsByOrderIdRepository(orderId)

    const existing = orderMeals.find(om => om.meal_id == mealId)
    if (!existing) {
        const error = new Error("Meal not found in this order")
        error.status = 404
        throw error
    }

    // Update the meal quantity
    await updateMealQuantityRepository(orderId, mealId, quantity)

    // Recalculate total price
    const updatedMeals = await findMealsByOrderIdRepository(orderId)
    let totalPrice = 0
    for (const meal of updatedMeals) {
        totalPrice += meal.unit_price * meal.quantity
    }
    totalPrice = Math.round(totalPrice * 100) / 100

    await updateOrderPriceRepository(orderId, totalPrice)
}


export async function removeMealFromOrderService(mealId, orderId) {
    const order = await findOrderByIdService(orderId);

    if (!order) {
        const error = new Error("Order not found")
        error.status = 404
        throw error
    }


    if (order.order_served) {
        const error = new Error("Order is already served")
        error.status = 409
        throw error
    }


    const orderMeals = await findMealsByOrderIdRepository(orderId)
    const mealInOrder = orderMeals.find(om => om.meal_id === Number(mealId))

    if (!mealInOrder) {
        const error = new Error("Meal not found in this order")
        error.status = 404
        throw error
    }


    await removeMealFromOrderRepository(orderId, mealId)


    let totalPrice = order.total_price - (mealInOrder.unit_price * mealInOrder.quantity)
    totalPrice = Math.round(totalPrice * 100) / 100


    await updateOrderPriceRepository(orderId, totalPrice)
}

export async function deleteOrderService(id) {
    const order = await findOrderByIdService(id)

    if (!order) {
        const error = new Error("Order not found")
        error.status = 404
        throw error
    }

    if (order.order_served) {
        const error = new Error("Order is already served")
        error.status = 409
        throw error
    }

    await deleteOrderRepository(id)
}