import express from "express";
import  {getUsers, login, profile, signup} from "../controller/userController.js";
import auth_middleware from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/getUsers", getUsers);
router.post("/login",login);
router.post("/signup",signup);
router.get("/profile", auth_middleware,profile)


export  default router;