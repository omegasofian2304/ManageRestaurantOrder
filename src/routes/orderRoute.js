import express from "express";
import { create } from "../controllers/orderController.js";
import { getOrder} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", create);

router.get("/:id", getOrder)

export default router;