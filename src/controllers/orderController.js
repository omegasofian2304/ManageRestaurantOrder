import { createOrder as createOrderService } from "../services/orderServices.js";
import { getOrderDetail} from "../services/orderServices.js";

export const create = async (req, res,next) => {
    try {
        const { clientName, served, price, employee_id } = req.body

        if (!clientName  === undefined) {
            return res.status(400).json({ error: 'clientName order required' })
        }
        else if (clientName) {
            if (clientName.length > 45) {
                return res.status(400).json({error: 'clientName must be less than 45 characters'})
            }
        }
        if (!served  === undefined) {
            return res.status(400).json({ error: 'served  order required' })
        }
        if (!employee_id === undefined) {
            return res.status(400).json({ error: 'employee_id order required' })
        }
        else if (typeof employee_id !== 'number' || price <= 0) {
            return res.status(400).json({ error: 'employee_id must be a positive number' })
        }
        else if (typeof served !== 'boolean') {
            return res.status(400).json({ error: 'served must be a boolean' })
        }
        if (!price === undefined) {
            return res.status(400).json({ error: 'price order required' })

        }
        else if (typeof price !== 'number' || price <= 0) {
            return res.status(400).json({ error: 'price must be a positive number' })
        }

        const order = { clientName, served, price, employee_id }
        await createOrderService(order);
        return res.status(201).json(order);
    } catch (error) {
        next(error)

    }
};

export const getOrder = async (req, res, next) => {
    try {
        const id = req.params.id
        const order = await getOrderDetail(id)
        return res.status(200).json(order)
    } catch (error) {
        next(error)
    }
}