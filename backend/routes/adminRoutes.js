import express from "express";

import { adminDashboard } from "../controller/adminController.js";
import { auth_middleware } from "../middleware/authMiddleware.js";
import { admin_middleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/adminDashboard", auth_middleware, admin_middleware, adminDashboard);

export default router;