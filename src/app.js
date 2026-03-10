import express from "express";
import orderRoute from "./routes/orderRoute.js";

import errorMiddleware from './middlewares/errorMiddleware.js'
import mealRouter from "./routes/mealRoute.js";
const app = express();

app.use(express.json());

app.use("/api/orders", orderRoute);

app.use("/meals", mealRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});