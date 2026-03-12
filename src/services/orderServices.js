/*
Author : Milo Soupper
Date : 04.03.2026
Title : orderRepository.js
Desc : Business logic for the order table
*/

import{findAllOrder as findAllOrders} from "../repositories/orderRepository.js";
import { createOrder as createOrderRepository, serveOrder as serveOrderRepository } from "../repositories/orderRepository.js";
import { findOrderById as findOrderByIdRepository } from "../repositories/orderRepository.js";
import {findOrderWithMeals as findOrderWithMealsRepository} from "../repositories/orderRepository.js";

import { createOrder as createOrderRepository } from "../repositories/orderRepository.js";
import { findOrderById, findMealsByOrderId} from "../repositories/orderRepository.js";

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

    const total_price = meals.reduce((sum, meal) => {
        return sum + parseFloat(meal.unit_price) * meal.quantity
    }, 0)

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