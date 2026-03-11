/*
Author : Milo Soupper
Date : 04.03.2026
Title : orderRepository.js
Desc : File containing all route for the order table
*/

import express from "express";
import {create, getAllOrders} from "../controllers/orderController.js";


const router = express.Router();

router.post("/", create);
router.get("/", getAllOrders)

export default router;