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

const router = Router();

router.get("/", findAllMealsController);

router.get("/:id", findMealByIdController);

router.post("/", createMealController);

router.patch("/:id", updateMealController);

router.delete("/:id", deleteMealController);

export default router;