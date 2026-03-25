/*
Author : Sofian Hussein, Léo del Duca, Milo Soupper, Rodrigo Silva Riço
Date : 18.03.2026
Title : authService.js
Desc : Business logic for employees
*/

import {
    findAllEmployeesRepository,
    findEmployeeByIDRepository,
} from '../repositories/employeeRepository.js'


export async function findAllEmployeesService(){
    return await findAllEmployeesRepository();
}

export async function findEmployeeByIDService(id){
    return await findEmployeeByIDRepository(id);
}