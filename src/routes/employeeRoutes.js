/*
Author : Sofian Hussein, Léo del Duca, Milo Soupper, Rodrigo Silva Riço
Date : 18.03.2026
Title : authRoutes.js
Desc : File containing all route for the employees
*/
import { Router } from "express";
import {
    findEmployeeByIDController,
    findAllEmployeesController,
    createEmployeeController,
    deleteEmployeeController,
    updateEmployeeController
} from "../controllers/employeeController.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";
import {requireRole} from "../middlewares/roleMiddleware.js";

const router = Router();

router.get("/", authMiddleware, requireRole(["admin"]), findAllEmployeesController);

router.get("/:id", authMiddleware, requireRole(["admin","manager"]),findEmployeeByIDController);

router.post("/", authMiddleware, requireRole(["admin"]), createEmployeeController);

router.patch("/:id", authMiddleware, requireRole(["admin"]), updateEmployeeController);

router.delete("/:id",authMiddleware, requireRole(["admin"]), deleteEmployeeController);

export default router;