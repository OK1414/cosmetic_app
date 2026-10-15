import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";


export const order = async (req, res) => {

    try {

        const userId = req.user.userId;

        const {
            shippingAddress
        } = req.body;

        if (!shippingAddress) {

            return res.status(400).json({
                is_successful: false,
                message: "Shipping address is required"
            });
        }

        const cart = await Cart.findOne({
            user: userId
        }).populate("items.product");

        if (!cart || cart.items.length === 0) {

            return res.status(400).json({
                is_successful: false,
                message: "Cart is empty"
            });
        }

        const products = cart.items.map((item) => ({
            product: item.product._id,
            price: item.product.price,
            quantity: item.quantity
        }));

        const newOrder = await Order.create({

            user: userId,

            products,

            shippingAddress,

            orderStatus: "Pending"

        });

        cart.items = [];

        await cart.save();

        const createdOrder = await Order.findById(
            newOrder._id
        )
            .populate("user")
            .populate("products.product");

        res.status(201).json({

            is_successful: true,

            message: "Order added successfully",

            data: createdOrder

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            is_successful: false,

            message: error.message

        });
    }
};


export const getMyOrders = async (req, res) => {

    try {

        const userId = req.user.userId;

        const orders = await Order.find({
            user: userId
        })
            .populate("products.product")
            .sort({ createdAt: -1 });

        res.status(200).json({

            is_successful: true,

            data: orders

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            is_successful: false,

            data: [],

            message: error.message

        });
    }
};


export const getOrder = async (req, res) => {

    try {

        const orders = await Order.find({})
            .populate("user")
            .populate("products.product")
            .sort({ createdAt: -1 });

        res.status(200).json({

            is_successful: true,

            data: orders

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            is_successful: false,

            data: [],

            message: error.message

        });
    }
};


export const updateOrder = async (req, res) => {

    try {

        const id = req.params.id;

        const {
            orderStatus
        } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(

            id,

            {
                orderStatus
            },

            {
                new: true
            }

        )
            .populate("user")
            .populate("products.product");

        if (!updatedOrder) {

            return res.status(404).json({

                is_successful: false,

                message: "Order not found"

            });
        }

        res.status(200).json({

            is_successful: true,

            message: "Order updated successfully",

            data: updatedOrder

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            is_successful: false,

            message: error.message

        });
    }
};


export const deleteOrder = async (req, res) => {

    try {

        const id = req.params.id;

        const deletedOrder =
            await Order.findByIdAndDelete(id);

        if (!deletedOrder) {

            return res.status(404).json({

                is_successful: false,

                message: "Order not found"

            });
        }

        res.status(200).json({

            is_successful: true,

            message: "Order deleted successfully",

            data: deletedOrder

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            is_successful: false,

            message: error.message

        });
    }
};