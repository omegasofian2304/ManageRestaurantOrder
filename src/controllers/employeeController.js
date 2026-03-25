
import{ createEmployeeService }from '../services/employeeService';


export const createEmployeeController = async (req, res, next) => {
    try {
        const { firstname, lastname, post, email, password} = req.body
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

        if (post === undefined) {
            return res.status(400).json({ error: 'post order required' })
        }
        else if (post.length > 45 || post.length < 2) {
            return res.status(400).json({ error: 'post must be less than 45 characters' })
        }

        if (email === undefined) {
            return res.status(400).json({ error: 'email order required' })
        }
        else if (email.length > 45 || email.length < 2) {
            return res.status(400).json({ error: 'email must be less than 45 characters' })
        }

        if (password === undefined) {
            return res.status(400).json({ error: 'password order required' })
        }
        else if (password.length > 45 || password.length < 2) {
            return res.status(400).json({ error: 'password must be less than 45 characters' })
        }

        const employee = { firstname, lastname, post, email, password }

        const result = await createEmployeeService(employee);
        return res.status(201).json(result);
    } catch (error) {
        next(error)

    }
}