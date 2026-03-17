/*
Author : Sofian Hussein, Léo del Duca, Milo Soupper, Rodrigo Silva Riço
Date : 04.03.2026
Title : orderRoutes.js
Desc : File containing all route for the orders
*/
import {
    addMealToAnOrderController,
    deleteOrderController,
    serveOrderController,
    updateMealQuantityController,
    createOrderController,
    getAllOrdersController,
    getOrderController,
    removeMealFromOrderController
} from "../controllers/orderController.js";
import { Router } from "express";


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