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
import {authMiddleware} from "../middlewares/authMiddleware.js";
import {requireRole} from "../middlewares/roleMiddleware.js";


const router = Router();

router.post("/", authMiddleware, createOrderController);

router.get("/", authMiddleware, getAllOrdersController)

router.get("/:id", authMiddleware, getOrderController)

router.post("/:id/meals", authMiddleware, addMealToAnOrderController)

router.patch('/:id/status', authMiddleware, serveOrderController)

router.delete('/:id/meals/:mealId', authMiddleware, removeMealFromOrderController)

router.delete("/:id", authMiddleware, requireRole(["admin"]), deleteOrderController)

router.patch("/:id/meals/:mealId", authMiddleware, updateMealQuantityController)

export default router;