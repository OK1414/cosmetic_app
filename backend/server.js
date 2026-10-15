import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";


const app = express(); 

app.use(cors());

app.use(express.json());

connectDB();

app.use("/", userRoutes);
app.use("/", categoriesRoutes);
app.use("/", productRoutes);
app.use("/", orderRoutes);
app.use("/admin", adminRoutes);
app.use("/", cartRoutes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})
