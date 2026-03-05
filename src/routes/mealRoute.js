/*
Author : Sofian Hussein
Date : 05.03.2026
Title : mealRoute.js
Desc : Route for the meal
*/
import { Router } from "express";
import { createMeal } from "../controllers/mealController.js";

const router = Router();

router.post("/", createMeal);

export default router;