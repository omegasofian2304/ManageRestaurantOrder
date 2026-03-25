/*
Author : Sofian Hussein, Léo del Duca, Milo Soupper, Rodrigo Silva Riço
Date : 04.03.2026
Title : mealController.js
Desc : File containing all controllers for the employees
*/

import { findAllEmployeesService, findEmployeeByIDService } from "../services/employeeService.js"


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