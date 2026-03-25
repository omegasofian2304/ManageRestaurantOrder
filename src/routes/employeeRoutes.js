import{createEmployeeController} from "../controllers/employeeController.js";
import {Router} from "express";

const router = Router();
router.post("/", createEmployeeController);

export default router;