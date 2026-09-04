import express from "express";
import { adminLogin } from "../controllers/adminAuthController.js";
import { createCategory, deleteCategory, getCategories, updateCategory } from "../controllers/categoryController.js";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/productController.js";
import { requireAdmin } from "../middleware/adminAuth.js";

const router = express.Router();

router.post("/login", adminLogin);
router.use(requireAdmin);
router.get("/categories", getCategories);
router.post("/categories", createCategory);
router.patch("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);
router.get("/products", getProducts);
router.post("/products", createProduct);
router.patch("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

export default router;
