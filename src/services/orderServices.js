import { createOrder as createOrderRepository } from "../repositories/orderRepository.js";

export const createOrder = async (data) => {
    return createOrderRepository(data);
};