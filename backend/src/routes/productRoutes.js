import express from "express";
import { getCategories } from "../controllers/categoryController.js";
import { getProductBySlug, getProducts } from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/groups", getCategories);
router.get("/:slug", getProductBySlug);

export default router;
