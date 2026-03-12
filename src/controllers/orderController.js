/*
Author : Milo Soupper
Date : 04.03.2026
Title : orderRepository.js
Desc : File containing all sql request for the order table
*/
import {createOrder as createOrderService} from "../services/orderServices.js";
import { findOrderWithMeals as findOrderWithMealsService} from "../services/orderServices.js";
import { findOrderById as findOrderByIdService } from "../services/orderServices.js";
import {serveOrder as serveOrderService} from "../services/orderServices.js";
import {findAllOrder} from "../services/orderServices.js";


export const create = async (req, res,next) => {
    try {
        console.log("Test")
        const { clientName, served, price, employee_id } = req.body
        console.log(req.body);
        if (clientName  === undefined) {
            return res.status(400).json({ error: 'clientName order required' })
        }
        else if (clientName) {
            if (clientName.length > 45) {
                return res.status(400).json({error: 'clientName must be less than 45 characters'})
            }
        }
        if (served  === undefined) {
            return res.status(400).json({ error: 'served  order required' })
        }
        if (employee_id === undefined) {
            return res.status(400).json({ error: 'employee_id order required' })
        }
        else if (typeof employee_id !== 'number') {
            return res.status(400).json({ error: 'employee_id must be a positive number' })
        }
        else if (typeof served !== 'boolean') {
            return res.status(400).json({ error: 'served must be a boolean' })
        }

        if (typeof price !== 'number' || price <= 0) {
            return res.status(400).json({ error: 'price must be a positive number' })
        }

        const order = { clientName, served, price, employee_id }
        await createOrderService(order);
        return res.status(201).json(order);
    } catch (error) {
        next(error)

    }
};



export const serveOrder = async (req, res, next) => {

    try {
        const { id } = req.params;

        const order = await findOrderByIdService(id);

        if (!order){
            return res.status(404).json({ error: "Can't find the order, maybe it doesn't exist ?" })

        }

        if (order.order_served) {
            return res.status(409).json({error : "Order has already been served"});
        }


        const meals = await findOrderWithMealsService(id);

        if (!meals || meals.length === 0){
            return res.status(422).json({error: "No meals found in the order"})
        }


        const result = await serveOrderService(id);
        res.status(200).json({ message: 'Order served', data: result });
    } catch (error) {
        next(error)
    }
};

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