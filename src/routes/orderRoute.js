/*
Author : Milo Soupper
Date : 04.03.2026
Title : orderRepository.js
Desc : File containing all route for the order table
*/
import {serveOrder} from "../controllers/orderController.js";
import { Router } from "express";
import {create, getAllOrders, getOrder} from "../controllers/orderController.js";


const router = Router();

router.post("/", create);

router.get("/:id", getOrder)

router.get("/", getAllOrders)

router.patch('/:id/status', serveOrder);

export default router;