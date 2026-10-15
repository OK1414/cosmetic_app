import express from "express";

import {category,getCategory,updateCategory,deleteCategory} from "../controller/categoriesController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";


const router = express.Router();


router.post("/category",authMiddleware,adminMiddleware,category);
router.get("/getCategory",getCategory);
router.put("/updateCategory/:id",authMiddleware,adminMiddleware,updateCategory);
router.delete("/deleteCategory/:id",authMiddleware,adminMiddleware,deleteCategory);

export default router;