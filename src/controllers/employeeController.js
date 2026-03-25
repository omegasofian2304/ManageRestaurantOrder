/*
Author : Sofian Hussein, Léo del Duca, Milo Soupper, Rodrigo Silva Riço
Date : 04.03.2026
Title : mealController.js
Desc : File containing all controllers for the employees
*/
import {
    findAllEmployeesService,
    findEmployeeByIDService,
    createEmployeeService,
    findEmployeeByEmailService,
    deleteEmployeeService,
    updateEmployeeService,
} from "../services/employeeService.js"
import {getAllOrdersService} from "../services/orderService.js";

export const createEmployeeController = async (req, res, next) => {
    try {
        const { firstname, lastname, post, email, password} = req.body
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        // Source : Claude
        // Prompt : Generate me a regex for a password who contain at least 8 characters,
        // 1 uppercase letter, 1 number, and 1 special character.
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

        if (firstname  === undefined) {
            return res.status(400).json({ error: 'firstname order required' })
        }
        else if (firstname) {
            if (firstname.length > 45 || firstname.length < 2) {
                return res.status(400).json({error: 'firstname must be less than 45 characters'})
            }
        }

        if (lastname === undefined) {
            return res.status(400).json({ error: 'lastname order required' })
        }
        else if (lastname.length > 45 || lastname.length < 2) {
            return res.status(400).json({ error: 'lastname must be less than 45 characters' })
        }

        if (post === undefined || !["admin", "manager", "employee"].includes(post)) {
            return res.status(400).json({ error: 'correct post order required (admin, manager, employee)' })
        }
        else if (post.length > 45 || post.length < 2) {
            return res.status(400).json({ error: 'post must be less than 45 characters' })
        }

        if (email === undefined) {
            return res.status(400).json({ error: 'email order required' })
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Email is invalid' })
        }

        else if (email.length > 45) {
            return res.status(400).json({ error: 'email must be less than 45 characters' })
        }

        if (password === undefined) {
            return res.status(400).json({ error: 'password order required' })
        }

        if (!passwordRegex.test(password)) {
            return res.status(400).json({ error: 'Password must contain at least 8 characters, 1 uppercase letter,' +
                    ' 1 number, and 1 special character.' })
        }

        if (await findEmployeeByEmailService(email) !== null) {
            return res.status(409).json({ error: 'account with this email already exists' })
        }

        const employee = { firstname, lastname, post, email, password }

        const result = await createEmployeeService(employee);
        return res.status(201).json(result);
    } catch (error) {
        next(error)

    }
}
export async function deleteEmployeeController(req, res, next) {
    try {
        const id = Number(req.params.id)

        const employee = await findEmployeeByIDService(id)

        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' })
        }

        const employeeHasOrder = await getAllOrdersService();

        const isUsed = employeeHasOrder.some(order => order.employee_id === id);

        if (isUsed) {
            return res.status(400).json({ error: 'Employee is used in one or more order' });
        }

        await deleteEmployeeService(id)
        return res.status(200).json({ message: 'Employee deleted successfully' })

    } catch (error) {
        next(error)
    }
}


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
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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

        if (email && !emailRegex.test(email)) {
            return res.status(400).json({ error: 'Email is invalid' })
        }

        if (post !== undefined && !["admin", "manager", "employee"].includes(post)) {
            return res.status(400).json({error: 'post must be admin, manager, or employee'})
        }
        const employee = await updateEmployeeService(id, firstname, lastname, email, post)
        return res.status(200).json(employee)
    } catch (error) {
        next(error)
    }
}