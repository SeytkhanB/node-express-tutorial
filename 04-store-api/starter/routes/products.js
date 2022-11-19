import { getAllProducts } from "../controllers/products.js";
import express from "express";
const router = express.Router();

router.route("/").get(getAllProducts);

export default router;
