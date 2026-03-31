/*
Author : Sofian Hussein, Léo del Duca, Milo Soupper, Rodrigo Silva Riço
Date : 05.03.2026
Title : mealRoutes.js
Desc : File containing all route for the meals
*/
import { Router } from "express";
import {
    createMealController,
    deleteMealController,
    findMealByIdController,
    findAllMealsController,
    updateMealController
} from "../controllers/mealController.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";
import {requireRole} from "../middlewares/roleMiddleware.js";

const router = Router();

router.get("/", authMiddleware, findAllMealsController);

router.get("/:id", authMiddleware, findMealByIdController);

router.post("/", authMiddleware, requireRole(["admin","manager"]), createMealController);

router.patch("/:id", authMiddleware, requireRole(["admin","manager"]), updateMealController);

router.delete("/:id", authMiddleware, requireRole(["admin","manager"]), deleteMealController);

export default router;