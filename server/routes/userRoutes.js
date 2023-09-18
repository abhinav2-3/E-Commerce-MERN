import express from "express";
import { login, signup } from "../controllers/userControls.js";
import {
  addProduct,
  deleteProduct,
  getProduct,
  productList,
  searchProduct,
  updateProduct,
} from "../controllers/productControls.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// Products Routes
router.post("/add-Product", addProduct);
router.get("/product-List", productList);
router.delete("/delete-Product/:id", deleteProduct);
router.get("/product/:id", getProduct);
router.put("/update/:id", updateProduct);
router.get("/search/:key", searchProduct);

export default router;
