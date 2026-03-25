/*
Author : Sofian Hussein, Léo del Duca, Milo Soupper, Rodrigo Silva Riço
Date : 18.03.2026
Title : authService.js
Desc : Business logic for employees
*/

import {
    findAllEmployeesRepository,
    findEmployeeByIDRepository,
    createEmployeeRepository
} from '../repositories/employeeRepository.js'
import bcrypt from 'bcrypt'
import {findEmployeeByEmailRepository} from "../repositories/authRepository.js";

export const createEmployeeService = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 12)
    return createEmployeeRepository({ ...data, password: hashedPassword });
}

export async function findAllEmployeesService(){
    return await findAllEmployeesRepository();
}

export async function findEmployeeByIDService(id){
    return await findEmployeeByIDRepository(id);
}

export async function findEmployeeByEmailService(email){
    return await findEmployeeByEmailRepository(email);
}