import express from "express";

import {product, getProduct, updateProduct, deleteProduct} from "../controller/productController.js";
import auth_middleware from "../middleware/authMiddleware.js";
import admin_middleware from "../middleware/adminMiddleware.js";

const router = express.Router();


router.post("/product",auth_middleware,admin_middleware,product);
router.get("/getProduct",getProduct);
router.put("/updateProduct/:id",auth_middleware,admin_middleware,updateProduct);
router.delete("/deleteProduct/:id",auth_middleware,admin_middleware,deleteProduct);

export default router;