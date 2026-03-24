/*
Author : Sofian Hussein, Léo del Duca, Milo Soupper, Rodrigo Silva Riço
Date : 18.03.2026
Title : authController.js
Desc : File containing all controllers for the employees
*/
import { loginEmployeeService } from "../services/authService.js"

export async function loginEmployeeController(req, res, next) {
    try {
        const { email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Source : https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Email is invalid' })
        }

        const token = await loginEmployeeService(email, password)
        return res.status(200).json({ message: 'Your Token : ', data: { token } })

    } catch (error) {
        next(error)
    }
}