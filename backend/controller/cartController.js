import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";


export const addToCart = async (req, res) => {

    try {

        const userId = req.user.userId;
        const { productId, quantity } = req.body;

        if (!productId) {
            return res.status(400).json({
                is_successful: false,
                message: "Product ID is required"
            });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                is_successful: false,
                message: "Product not found"
            });
        }

        const addQuantity = quantity || 1;

        let cart = await Cart.findOne({
            user: userId
        });

        if (!cart) {

            cart = await Cart.create({
                user: userId,
                items: [
                    {
                        product: productId,
                        quantity: addQuantity
                    }
                ]
            });

        } else {

            const existingItem = cart.items.find(
                (item) =>
                    item.product.toString() === productId
            );

            if (existingItem) {

                existingItem.quantity += addQuantity;

            } else {

                cart.items.push({
                    product: productId,
                    quantity: addQuantity
                });

            }

            await cart.save();
        }

        const updatedCart = await Cart.findOne({
            user: userId
        }).populate("items.product");

        res.status(200).json({
            is_successful: true,
            message: "Product added to cart",
            data: updatedCart
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            is_successful: false,
            message: error.message
        });
    }
};


export const getCart = async (req, res) => {

    try {

        const userId = req.user.userId;

        const cart = await Cart.findOne({
            user: userId
        }).populate("items.product");

        if (!cart) {

            return res.status(200).json({
                is_successful: true,
                data: {
                    user: userId,
                    items: []
                }
            });
        }

        res.status(200).json({
            is_successful: true,
            data: cart
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            is_successful: false,
            message: error.message
        });
    }
};


export const updateCartQuantity = async (req, res) => {

    try {

        const userId = req.user.userId;
        const { productId, quantity } = req.body;

        if (!productId || !quantity) {

            return res.status(400).json({
                is_successful: false,
                message: "Product ID and quantity are required"
            });
        }

        if (quantity < 1) {

            return res.status(400).json({
                is_successful: false,
                message: "Quantity must be at least 1"
            });
        }

        const cart = await Cart.findOne({
            user: userId
        });

        if (!cart) {

            return res.status(404).json({
                is_successful: false,
                message: "Cart not found"
            });
        }

        const item = cart.items.find(
            (item) =>
                item.product.toString() === productId
        );

        if (!item) {

            return res.status(404).json({
                is_successful: false,
                message: "Product not found in cart"
            });
        }

        item.quantity = quantity;

        await cart.save();

        const updatedCart = await Cart.findOne({
            user: userId
        }).populate("items.product");

        res.status(200).json({
            is_successful: true,
            message: "Cart quantity updated",
            data: updatedCart
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            is_successful: false,
            message: error.message
        });
    }
};


export const removeFromCart = async (req, res) => {

    try {

        const userId = req.user.userId;
        const { productId } = req.body;

        if (!productId) {

            return res.status(400).json({
                is_successful: false,
                message: "Product ID is required"
            });
        }

        const cart = await Cart.findOne({
            user: userId
        });

        if (!cart) {

            return res.status(404).json({
                is_successful: false,
                message: "Cart not found"
            });
        }

        cart.items = cart.items.filter(
            (item) =>
                item.product.toString() !== productId
        );

        await cart.save();

        const updatedCart = await Cart.findOne({
            user: userId
        }).populate("items.product");

        res.status(200).json({
            is_successful: true,
            message: "Product removed from cart",
            data: updatedCart
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            is_successful: false,
            message: error.message
        });
    }
};


export const clearCart = async (req, res) => {

    try {

        const userId = req.user.userId;

        const cart = await Cart.findOne({
            user: userId
        });

        if (!cart) {

            return res.status(404).json({
                is_successful: false,
                message: "Cart not found"
            });
        }

        cart.items = [];

        await cart.save();

        res.status(200).json({
            is_successful: true,
            message: "Cart cleared",
            data: cart
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            is_successful: false,
            message: error.message
        });
    }
};