/*
Author : Milo Soupper
Date : 04.03.2026
Title : orderRepository.js
Desc : Business logic for the order table
*/

import {
    addMealToAnOrderRepository,
    findAllOrder as findAllOrders,
    updateMealQuantityInOrderRepository, updateOrderPrice
} from "../repositories/orderRepository.js";
import { createOrder as createOrderRepository, serveOrder as serveOrderRepository } from "../repositories/orderRepository.js";
import { findOrderById as findOrderByIdRepository } from "../repositories/orderRepository.js";
import { findOrderWithMeals as findOrderWithMealsRepository} from "../repositories/orderRepository.js";
import { findMealsByOrderId} from "../repositories/orderRepository.js";
import {findMealByID} from "../repositories/mealRepository.js";

export const createOrder = async (data) => {
    return createOrderRepository(data);
}

export const findAllOrder = async () => {
        return findAllOrders();
    };

export const findOrderById = async (id) => {
    return findOrderByIdRepository(id);
}


export const findOrderWithMeals = async (id) => {
    return findOrderWithMealsRepository(id);
}

export const serveOrder = async (id) => {
    return await serveOrderRepository(id);
};

export const getOrderDetail = async (id) => {
    const order = await findOrderById(id)

    if (!order) {
        const error = new Error("Order not found")
        error.status = 404
        throw error
    }
    const meals = await findMealsByOrderId(id)

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
    const order = await findOrderById(orderId);

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

    const orderMeals = await findMealsByOrderId(orderId)

    for (const meal of mergedMeals) {
        const existing = orderMeals.find(om => om.meal_id === meal.id)
        if (existing) {
            await updateMealQuantityInOrderRepository(orderId, meal.id, existing.quantity + meal.quantity)
        } else {
            await addMealToAnOrderRepository(orderId, meal.id, meal.quantity)
        }
    }

    // Recalculate total price
    const updatedMeals = await findMealsByOrderId(orderId)
    let totalPrice = 0

    for (const meal of updatedMeals) {
        totalPrice += meal.unit_price * meal.quantity
    }

    totalPrice = Math.round(totalPrice * 100) / 100

    await updateOrderPrice(orderId, totalPrice)
}

export async function updateMealQuantityService(orderId, mealId, quantity) {
    const order = await findOrderById(orderId);

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

    const orderMeals = await findMealsByOrderId(orderId)

    const existing = orderMeals.find(om => om.meal_id == mealId)
    if (!existing) {
        const error = new Error("Meal not found in this order")
        error.status = 404
        throw error
    }

    // Update the meal quantity
    await updateMealQuantityInOrderRepository(orderId, mealId, quantity)

    // Recalculate total price
    const updatedMeals = await findMealsByOrderId(orderId)
    let totalPrice = 0
    for (const meal of updatedMeals) {
        totalPrice += meal.unit_price * meal.quantity
    }
    totalPrice = Math.round(totalPrice * 100) / 100

    await updateOrderPrice(orderId, totalPrice)
}