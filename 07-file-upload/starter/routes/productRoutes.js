import {
  createProduct,
  getAllProducts,
} from "../controllers/productController.js";
import { uploadProductImage } from "../controllers/uploadsController.js";
import express from "express";
const router = express.Router();

router.route("/").get(getAllProducts).post(createProduct);
router.route("/uploads").post(uploadProductImage);

export default router;
