/*
Author : Sofian Hussein, Léo del Duca, Milo Soupper, Rodrigo Silva Riço
Date : 04.03.2026
Title : mealController.js
Desc : File containing all controllers for the employees
*/

import {findAllEmployeesService, findEmployeeByIDService, updateEmployeeService} from "../services/employeeService.js"
import {updateMealService} from "../services/mealService.js";


export async function findAllEmployeesController(req, res, next){
    try {

        const employees = await findAllEmployeesService()
        return res.status(200).json(employees)
    } catch (error) {
        next(error)
    }
}


export async function findEmployeeByIDController(req, res, next){
    try {

        let id = req.params.id

        if (!id) {
            return res.status(400).json({error: 'id is required'})
        }

        const employee = await findEmployeeByIDService(id)

        if (!employee) {
            return res.status(404).json({error: 'employee not found'})
        }

        return res.status(200).json(employee)
    } catch (error) {
        next(error)

    }
}


export async function updateEmployeeController(req, res, next){
    try {
        const {firstname, lastname, email, post} = req.body
        const id = req.params.id

        if (!firstname && !lastname && !email && post === undefined) {
            return res.status(400).json({error: "At least one field is required"});
        }

        if (firstname) {
            if (firstname.length < 2) {
                return res.status(400).json({error: 'first name must be at least 2 characters'})
            }
            if (firstname.length > 45) {
                return res.status(400).json({error: 'first name must be less than 45 characters'})
            }
        }

        if (lastname) {
            if (lastname.length < 2) {
                return res.status(400).json({error: 'last name must be at least 2 characters'})
            }
            if (lastname.length > 45) {
                return res.status(400).json({error: 'last name must be less than 45 characters'})
            }
        }

        if (email) {

        }

        if (post === undefined || !["admin", "manager", "employee"].includes(post)) {
            return res.status(400).json({error: 'post must be admin, manager, or employee'})


        }
        const employee = await updateEmployeeService(id, firstname, lastname, email, post)
        return res.status(200).json(employee)
    } catch (error) {
        next(error)
    }
}