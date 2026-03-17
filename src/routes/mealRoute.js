/*
Author : Sofian Hussein
Date : 05.03.2026
Title : mealRoute.js
Desc : Route for the meal
*/
import { Router } from "express";
import {
    createMeal,
    deleteMealController,
    findMealByIdController,
    getMeals,
    modifyMeal
} from "../controllers/mealController.js";

const router = Router();

router.get("/", getMeals);

router.get("/:id", findMealByIdController);

router.post("/", createMeal);

router.patch("/:id", modifyMeal);

router.delete("/:id", deleteMealController);

export default router;