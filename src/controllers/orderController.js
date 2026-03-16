/*
Author : Milo Soupper
Date : 04.03.2026
Title : orderRepository.js
Desc : File containing all sql request for the order table
*/
import {addMealToAnOrderService, createOrder as createOrderService} from "../services/orderServices.js";
import { findOrderWithMeals as findOrderWithMealsService} from "../services/orderServices.js";
import { findOrderById as findOrderByIdService } from "../services/orderServices.js";
import {serveOrder as serveOrderService} from "../services/orderServices.js";
import {removeMealFromOrderService} from "../services/orderServices.js";
import {findAllOrder} from "../services/orderServices.js";
import { getOrderDetail} from "../services/orderServices.js";
import {findMealByID} from "../repositories/mealRepository.js";

export const create = async (req, res,next) => {
    try {
        const { clientName, served, price, employee_id } = req.body
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

export const getOrder = async (req, res, next) => {
    try {
        const id = req.params.id
        const order = await getOrderDetail(id)
        return res.status(200).json(order)
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

export async function addMealToAnOrderController(req, res, next) {
    try {
        const { meals } = req.body

        const orderId = req.params.id


        if (!Array.isArray(meals) || meals.length === 0) {
            return res.status(400).json({ error: 'Meals must be a non-empty array' })
        }

        for (const meal of meals) {
            if (typeof meal.id !== 'number' || meal.id <= 0) {
                return res.status(400).json({ error: 'ID must be a positive number' })
            }

            if (typeof meal.quantity !== 'number' || meal.quantity <= 0) {
                return res.status(400).json({ error: 'Quantity must be more than 0' })
            }

            if (!await findMealByID(meal.id)) {
                return res.status(400).json({ error: `Meal ${meal.id} not found` })
            }
        }

        await addMealToAnOrderService(meals, orderId)
        return res.status(200).json({ message: 'Meals added successfully' })

    } catch (error) {
        next(error)
    }
}


export async function removeMealFromOrderController(req, res, next) {
    try {
        const { id, mealId } = req.params


        if (isNaN(id) || Number(id) <= 0) {
            return res.status(400).json({ error: 'Order ID must be a positive number' })
        }

        if (isNaN(mealId) || Number(mealId) <= 0) {
            return res.status(400).json({ error: 'Meal ID must be a positive number' })
        }


        await removeMealFromOrderService(mealId, id)


        return res.status(200).json({ message: 'Meal removed successfully' })

    } catch (error) {
        next(error)
    }
}
