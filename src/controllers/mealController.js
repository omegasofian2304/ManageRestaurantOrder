/*
Author : Sofian Hussein
Date : 04.03.2026
Title : mealController.js
Desc : File containing all functions for the meal table
*/
import { addMeal } from "../services/mealService.js"

export async function createMeal(req, res, next) {
    try {
        const { name, price, description } = req.body

        if (!name || price === undefined) {
            return res.status(400).json({ error: 'name and price are required' })
        }

        if (typeof price !== 'number' || price <= 0) {
            return res.status(400).json({ error: 'price must be a positive number' })
        }

        const meal = await addMeal(name, price, description)
        return res.status(201).json(meal)
    } catch (error) {
        next(error)
    }
}