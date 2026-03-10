/*
Author : Sofian Hussein
Date : 05.03.2026
Title : mealRoute.js
Desc : Route for the meal
*/
import { Router } from "express";
import {createMeal, getMeals, modifyMeal} from "../controllers/mealController.js";

const router = Router();

router.get("/", getMeals);

router.post("/", createMeal);

router.patch("/:id", modifyMeal);

export default router;