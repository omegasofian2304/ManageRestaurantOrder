/*
Author : Sofian Hussein, Léo del Duca, Milo Soupper, Rodrigo Silva Riço
Date : 18.03.2026
Title : authService.js
Desc : Business logic for employees
*/

import {
    findAllEmployeesRepository,
    findEmployeeByIDRepository, updateEmployeeRepository,
} from '../repositories/employeeRepository.js'



export async function findAllEmployeesService(){
    return await findAllEmployeesRepository();
}

export async function findEmployeeByIDService(id){
    return await findEmployeeByIDRepository(id);
}

export async function updateEmployeeService(id, firstname = null,lastname = null,email = null, post = null)
{
    const existingEmployee = await findEmployeeByIDService(id);

    if(!existingEmployee){
        const error = new Error('An Employee with this id does not exist')
        error.status = 404
        throw error
    }


    return await updateEmployeeRepository(id, firstname, lastname, email,post)
}