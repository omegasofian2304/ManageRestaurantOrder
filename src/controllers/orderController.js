/*
Author : Sofian Hussein, Léo del Duca, Milo Soupper, Rodrigo Silva Riço
Date : 04.03.2026
Title : orderRepository.js
Desc : File containing all controllers for the orders
*/
import {
    addMealToAnOrderService, createOrderService, deleteOrderService, updateMealQuantityService,
    findOrderWithMealsService, findOrderByIdService, serveOrderService, removeMealFromOrderService,
    getAllOrdersService, getOrderDetailService
} from "../services/orderService.js";
import { findMealByIDService } from "../services/mealService.js";

export const createOrderController = async (req, res, next) => {
    try {
        const { clientName, employee_id } = req.body
        if (clientName  === undefined) {
            return res.status(400).json({ error: 'clientName order required' })
        }
        else if (clientName) {
            if (clientName.length > 45 || clientName.length < 2) {
                return res.status(400).json({error: 'clientName must be less than 45 characters'})
            }
        }

        if (employee_id === undefined) {
            return res.status(400).json({ error: 'employee_id order required' })
        }
        else if (typeof employee_id !== 'number') {
            return res.status(400).json({ error: 'employee_id must be a positive number' })
        }

        // set default price to 0
        const price = 0

        // set an order unserved by default
        const served = 0

        const order = { clientName, served, price, employee_id }

        const result = await createOrderService(order);
        return res.status(201).json(result);
    } catch (error) {
        next(error)

    }
};

export const getOrderController = async (req, res, next) => {
    try {
        const id = req.params.id
        const order = await getOrderDetailService(id)
        return res.status(200).json(order)
    } catch (error) {
        next(error)
    }
};


export const serveOrderController = async (req, res, next) => {

    try {
        const { id } = req.params;

        const { order_served } = req.body

        const order = await findOrderByIdService(id);

        if (!order){
            return res.status(404).json({ error: "Can't find the order, maybe it doesn't exist ?" })

        }

        if (order.order_served) {
            return res.status(409).json({error : "Order has already been served"});
        }

        if (order_served === undefined || order_served !== 1) {
            return res.status(400).json({ error: 'order_served must be 1' })
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

export const getAllOrdersController = async (req, res, next) => {
    try {
        const orders = await getAllOrdersService();
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
            if (typeof meal.meal_id !== 'number' || meal.meal_id <= 0) {
                return res.status(400).json({ error: 'ID must be a positive number' })
            }

            if (typeof meal.quantity !== 'number' || meal.quantity <= 0) {
                return res.status(400).json({ error: 'Quantity must be more than 0' })
            }

            if (!await findMealByIDService(meal.meal_id)) {
                return res.status(400).json({ error: `Meal ${meal.meal_id} not found` })
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

export async function updateMealQuantityController(req, res, next) {
    try {
        const orderId = req.params.id
        const mealId = req.params.mealId
        const { quantity } = req.body

        if (typeof quantity !== 'number' || quantity < 1) {
            return res.status(400).json({ error: 'quantity must be a positive number' })
        }

        if (isNaN(orderId) || Number(orderId) <= 0) {
            return res.status(400).json({ error: 'Order ID must be a positive number' })
        }

        if (isNaN(mealId) || Number(mealId) <= 0) {
            return res.status(400).json({ error: 'Meal ID must be a positive number' })
        }

        await updateMealQuantityService(orderId, mealId, quantity)
        return res.status(200).json({ message: 'Meal quantity updated successfully' })

    } catch (error) {
        next(error)
    }
}

export async function deleteOrderController(req, res, next) {
    try {
        const id = req.params.id

        await deleteOrderService(id)
        return res.status(200).json({ message: 'Order deleted successfully' })
    } catch (error) {
        next(error)
    }
}