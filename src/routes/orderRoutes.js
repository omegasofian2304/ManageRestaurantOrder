/*
Author : Milo Soupper
Date : 04.03.2026
Title : orderRepository.js
Desc : File containing all route for the order table
*/
import {
    addMealToAnOrderController,
    deleteOrderController,
    serveOrderController,
    updateMealQuantityController
} from "../controllers/orderController.js";
import { Router } from "express";
import {createOrderController, getAllOrdersController, getOrderController} from "../controllers/orderController.js";
import { removeMealFromOrderController } from "../controllers/orderController.js";


const router = Router();

router.post("/", createOrderController);

router.get("/", getAllOrdersController)

router.get("/:id", getOrderController)

router.post("/:id/meals", addMealToAnOrderController)

router.patch('/:id/status', serveOrderController)

router.delete('/:id/meals/:mealId', removeMealFromOrderController)

router.delete("/:id", deleteOrderController)

router.patch("/:id/meals/:mealId", updateMealQuantityController)

export default router;