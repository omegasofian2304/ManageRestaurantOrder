/*
Author : Sofian Hussein
Date : 04.03.2026
Title : mealController.js
Desc : File containing all functions for the meal table
*/
import {createMealService, deleteMealService, findMealByIDService, findAllMealsService, updateMealService} from "../services/mealService.js"

export async function createMealController(req, res, next) {
    try {
        const { name, price, description } = req.body

        if (!name || price === undefined) {
            return res.status(400).json({ error: 'name and price are required' })
        }

        // Source Claude
        // Prompt : how to test if a variable is a number in js
        if (typeof price !== 'number' || price <= 0) {
            return res.status(400).json({ error: 'price must be a positive number' })
        }

        const meal = await createMealService(name, price, description)
        return res.status(201).json(meal)
    } catch (error) {
        next(error)
    }
}

export async function updateMealController(req, res, next){
    try {
        const {name, price, description, is_available} = req.body
        const id = req.params.id

        if (!name && !price && !description && is_available === undefined) {
            return res.status(400).json({error: "At least one field is required"});
        }
        if (price) {
            if (typeof price !== 'number' || price <= 0) {
                return res.status(400).json({error: 'price must be a positive number'})
            }
        }

        if (name) {
            if (name.length < 2) {
                return res.status(400).json({error: 'name must be at least 2 characters'})
            }
            if (name.length > 45) {
                return res.status(400).json({error: 'name must be less than 45 characters'})
            }
        }

        if (description) {
            if (description.length > 45) {
                return res.status(400).json({error: 'description must be less than 45 characters'})
            }
        }
        if (is_available !== undefined) {
            if (typeof is_available !== 'boolean') {
                return res.status(400).json({error: 'is_available must be a boolean'})
            }
        }
        const meal = await updateMealService(id, name, price, description, is_available)
        return res.status(200).json(meal)

    } catch (error) {
        next(error)
    }
}

export async function findAllMealsController(req, res, next){
    try {
        let available = req.query.available

        if (available !== undefined) {
            available = available.toLowerCase()
            if (available === "true") {
                available = 1
            }
            else if (available === "false") {
                available = 0
            }
            else {
                return res.status(400).json({error: 'available must be a boolean'})
            }
        }

        const meals = await findAllMealsService(available)
        return res.status(200).json(meals)
    } catch (error) {
        next(error)
    }
}

export async function findMealByIdController(req, res, next){
    try {

        let id = req.params.id

        if (!id) {
            return res.status(400).json({error: 'id is required'})
        }

        const meal = await findMealByIDService(id)

        if (!meal) {
            return res.status(404).json({error: 'meal not found'})
        }

        return res.status(200).json(meal)
    } catch (error) {
        next(error)
    }
}

export async function deleteMealController(req, res, next) {
    try {
        const id = req.params.id

        const meal = await findMealByIDService(id)

        if (!meal) {
            return res.status(404).json({ error: 'Meal not found' })
        }

        await deleteMealService(id)
        return res.status(200).json({ message: 'Meal deleted successfully' })

    } catch (error) {
        next(error)
    }
}