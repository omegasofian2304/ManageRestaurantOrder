/*
Author : Milo Soupper
Date : 04.03.2026
Title : orderRepository.js
Desc : Business logic for the order table
*/

import { createOrder as createOrderRepository } from "../repositories/orderRepository.js";

export const createOrder = async (data) => {
    return createOrderRepository(data);
};