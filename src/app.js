/*
Author : Sofian Hussein, Léo del Duca, Milo Soupper, Rodrigo Silva Riço
Date : 04.03.2026
Title : app.js
Desc : This file is the entry point of the application
*/
import express from "express";
import orderRoute from "./routes/orderRoutes.js";
import employeeRouter from "./routes/employeeRoutes.js";
import errorMiddleware from './middlewares/errorMiddleware.js'
import mealRouter from "./routes/mealRoutes.js";
import authRouter from "./routes/authRoutes.js";

const app = express();

app.use(express.json());

app.use("/orders", orderRoute);

app.use("/meals", mealRouter);

app.use("/auth", authRouter);

app.use("/employee",authMiddleware, requireRole(["admin","manager"]), employeeRouter );

app.use("/employees", employeeRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});