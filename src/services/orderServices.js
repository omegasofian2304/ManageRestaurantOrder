import { createOrder as createOrderRepository, serveOrder as serveOrderRepository } from "../repositories/orderRepository.js";
import { findOrderById as findOrderByIdRepository } from "../repositories/orderRepository.js";
import {findOrderWithMeals as findOrderWithMealsRepository} from "../repositories/orderRepository.js";


export const createOrder = async (data) => {
    return createOrderRepository(data);
}


export const findOrderById = async (id) => {
    return findOrderByIdRepository(id);
}


export const findOrderWithMeals = async (id) => {
    return findOrderWithMealsRepository(id);
}

export const serveOrder = async (id) => {
    return await serveOrderRepository(id);
};