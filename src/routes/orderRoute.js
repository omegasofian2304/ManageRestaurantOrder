import express from "express";
import { create } from "../controllers/orderController.js";
import {serveOrder} from "../controllers/orderController.js";
import { Router } from "express";

const router = Router();

router.post("/", create);

router.patch('/:id/status', serveOrder);

export default router;