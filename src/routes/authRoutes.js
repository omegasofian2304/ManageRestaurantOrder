/*
Author : Sofian Hussein, Léo del Duca, Milo Soupper, Rodrigo Silva Riço
Date : 18.03.2026
Title : authRoutes.js
Desc : File containing all route for auth
*/
import { Router } from "express";
import {loginEmployeeController} from "../controllers/authController.js";

const router = Router();

router.post("/login", loginEmployeeController);

export default router;