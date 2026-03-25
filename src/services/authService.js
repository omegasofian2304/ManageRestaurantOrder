/*
Author : Sofian Hussein, Léo del Duca, Milo Soupper, Rodrigo Silva Riço
Date : 18.03.2026
Title : authService.js
Desc : Business logic for auth
*/
import {findEmployeeByEmailRepository} from "../repositories/authRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function loginEmployeeService(email, password) {
    const employee = await findEmployeeByEmailRepository(email)

    if (!employee) {
        const error = new Error('invalid credentials')
        error.status = 401
        throw error
    }

    const match = await bcrypt.compare(password, employee.password)
    if (!match) {
        const error = new Error('invalid credentials')
        error.status = 401
        throw error
    }

    return jwt.sign(
        { id: employee.id, post: employee.post },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
    )
}