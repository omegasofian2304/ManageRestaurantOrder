/*
Author : Milo Soupper
Date : 04.03.2026
Title : orderRepository.js
Desc : File containing all route for the order table
*/

import express from "express";
import { create } from "../controllers/orderController.js";
import {serveOrder} from "../controllers/orderController.js";
import { Router } from "express";
import {create, getAllOrders} from "../controllers/orderController.js";


const router = Router();

router.post("/", create);

router.get("/", getAllOrders)

router.patch('/:id/status', serveOrder);

export default router;