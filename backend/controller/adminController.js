import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import Category from "../models/category.model.js";
import Order from "../models/order.model.js";

export const adminDashboard = async (req, res) => {
    try {

        const users = await User.countDocuments();
        const products = await Product.countDocuments();
        const categories = await Category.countDocuments();
        const orders = await Order.countDocuments();

        res.json({
            is_successful: true,
            message: "Admin dashboard",
            data: {
                users,
                products,
                categories,
                orders
            }
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            is_successful: false,
            message: error.message
        });
    }
};