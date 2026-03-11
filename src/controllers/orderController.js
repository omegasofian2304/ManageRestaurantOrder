/*
Author : Milo Soupper
Date : 04.03.2026
Title : orderRepository.js
Desc : File containing all function for the order table
*/

import { createOrder as createOrderService } from "../services/orderServices.js";
import {findAllOrder} from "../services/orderServices.js";
export const create = async (req, res,next) => {
    try {
        const { clientName, served, price, employee_id } = req.body

        if (!clientName  === undefined) {
            return res.status(400).json({ error: 'clientName order required' })
        }
        else if (clientName) {
            if (clientName.length > 45) {
                return res.status(400).json({error: 'clientName must be less than 45 characters'})
            }
        }
        if (!served  === undefined) {
            return res.status(400).json({ error: 'served  order required' })
        }
        if (!employee_id === undefined) {
            return res.status(400).json({ error: 'employee_id order required' })
        }
        else if (typeof employee_id !== 'number' || price <= 0) {
            return res.status(400).json({ error: 'employee_id must be a positive number' })
        }
        else if (typeof served !== 'boolean') {
            return res.status(400).json({ error: 'served must be a boolean' })
        }
        if (!price === undefined) {
            return res.status(400).json({ error: 'price order required' })

        }
        else if (typeof price !== 'number' || price <= 0) {
            return res.status(400).json({ error: 'price must be a positive number' })
        }

        const order = { clientName, served, price, employee_id }
        await createOrderService(order);
        return res.status(201).json(order);
    } catch (error) {
        next(error)

    }
}
export const getAllOrders = async (req, res, next) => {
    try {
        const orders = await findAllOrder();
        if (!orders) {
            return res.status(404).json({ message: "No orders found" });
        }
        res.json(orders);
    } catch (err) {
        next(err);
    }
};