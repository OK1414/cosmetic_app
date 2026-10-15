import express from "express";

import {
    addToCart,
    getCart,
    updateCartQuantity,
    removeFromCart,
    clearCart
} from "../controller/cartController.js";

import auth_middleware  from "../middleware/authMiddleware.js";



const router = express.Router();


router.post(
    "/addToCart",
    auth_middleware,
    addToCart
);


router.get(
    "/getCart",
    auth_middleware,
    getCart
);


router.put(
    "/updateCartQuantity",
    auth_middleware,
    updateCartQuantity
);


router.delete(
    "/removeFromCart",
    auth_middleware,
    removeFromCart
);


router.delete(
    "/clearCart",
    auth_middleware,
    clearCart
);


export default router;