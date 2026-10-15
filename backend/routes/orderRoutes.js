import express from "express";

import {order,getOrder,getMyOrders,updateOrder,deleteOrder} from "../controller/orderController.js";
import { auth_middleware } from "../middleware/authMiddleware.js";
import { admin_middleware } from "../middleware/adminMiddleware.js";


const router = express.Router();


router.post("/order",auth_middleware,order);
router.get("/getMyOrders",auth_middleware,getMyOrders);
router.get("/getOrder",auth_middleware,admin_middleware,getOrder);
router.put("/updateOrder/:id",auth_middleware,admin_middleware,updateOrder);
router.delete("/deleteOrder/:id",auth_middleware,admin_middleware,deleteOrder);

export default router;