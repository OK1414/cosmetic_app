import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";


function Cart({
    goToProducts,
    goToOrders,
    refreshCartCount
}) {

    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);


    const getCart = async () => {

        try {

            const token = localStorage.getItem("token");

            if (!token) {

                setCartItems([]);
                setLoading(false);
                return;

            }

            const response = await fetch(
                "http://localhost:3000/getCart",
                {
                    headers: {
                        Authorization: token
                    }
                }
            );

            const data = await response.json();

            if (data.is_successful) {

                setCartItems(
                    data.data?.items || []
                );

            }

        } catch (error) {

            console.log("Get Cart Error:", error);

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        getCart();

    }, []);


    const updateQuantity = async (
        productId,
        quantity
    ) => {

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:3000/updateCartQuantity",
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token
                    },

                    body: JSON.stringify({
                        productId,
                        quantity
                    })
                }
            );

            const data = await response.json();

            if (data.is_successful) {

                setCartItems(
                    data.data.items
                );

                if (refreshCartCount) {
                    refreshCartCount();
                }

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.log(
                "Update Quantity Error:",
                error
            );

        }
    };


    const increaseQuantity = (item) => {

        updateQuantity(
            item.product._id,
            item.quantity + 1
        );

    };


    const decreaseQuantity = (item) => {

        if (item.quantity === 1) {
            removeItem(item.product._id);
            return;
        }

        updateQuantity(
            item.product._id,
            item.quantity - 1
        );

    };


    const removeItem = async (productId) => {

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:3000/removeFromCart",
                {
                    method: "DELETE",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token
                    },

                    body: JSON.stringify({
                        productId
                    })
                }
            );

            const data = await response.json();

            if (data.is_successful) {

                setCartItems(
                    data.data.items
                );

                if (refreshCartCount) {
                    refreshCartCount();
                }

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.log(
                "Remove Cart Error:",
                error
            );

        }
    };


    const clearCart = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:3000/clearCart",
                {
                    method: "DELETE",

                    headers: {
                        Authorization: token
                    }
                }
            );

            const data = await response.json();

            if (data.is_successful) {

                setCartItems([]);

                if (refreshCartCount) {
                    refreshCartCount();
                }

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.log(
                "Clear Cart Error:",
                error
            );

        }
    };


    const totalAmount = cartItems.reduce(
        (total, item) => {

            return (
                total +
                item.product.price * item.quantity
            );

        },
        0
    );


    if (loading) {

        return (
            <Box sx={{ p: 5 }}>

                <Typography>
                    Loading cart...
                </Typography>

            </Box>
        );
    }


    if (cartItems.length === 0) {

        return (
            <Box
                sx={{
                    textAlign: "center",
                    p: 8
                }}
            >

                <Typography
                    variant="h4"
                    fontWeight="bold"
                    mb={2}
                >
                    Your Cart is Empty
                </Typography>

                <Typography
                    color="text.secondary"
                    mb={3}
                >
                    Add some products to your cart.
                </Typography>

                <Button
                    variant="contained"
                    onClick={goToProducts}
                >
                    Continue Shopping
                </Button>

            </Box>
        );
    }


    return (
        <Box
            sx={{
                p: {
                    xs: 2,
                    md: 5
                }
            }}
        >

            <Typography
                variant="h4"
                fontWeight="bold"
                mb={4}
            >
                My Cart
            </Typography>


            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "2fr 1fr"
                    },
                    gap: 4
                }}
            >

                <Box>

                    {cartItems.map((item) => (

                        <Paper
                            key={item.product._id}
                            sx={{
                                p: 2,
                                mb: 2
                            }}
                        >

                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent:
                                        "space-between",
                                    gap: 2
                                }}
                            >

                                <Box sx={{ flexGrow: 1 }}>

                                    <Typography
                                        variant="h6"
                                        fontWeight="bold"
                                    >
                                        {item.product.name}
                                    </Typography>

                                    <Typography
                                        color="text.secondary"
                                    >
                                        ₹{item.product.price}
                                    </Typography>

                                </Box>


                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center"
                                    }}
                                >

                                    <IconButton
                                        onClick={() =>
                                            decreaseQuantity(item)
                                        }
                                    >
                                        <RemoveIcon />
                                    </IconButton>

                                    <Typography
                                        sx={{
                                            mx: 2,
                                            fontWeight: "bold"
                                        }}
                                    >
                                        {item.quantity}
                                    </Typography>

                                    <IconButton
                                        onClick={() =>
                                            increaseQuantity(item)
                                        }
                                    >
                                        <AddIcon />
                                    </IconButton>

                                </Box>


                                <IconButton
                                    color="error"
                                    onClick={() =>
                                        removeItem(
                                            item.product._id
                                        )
                                    }
                                >
                                    <DeleteIcon />
                                </IconButton>

                            </Box>

                        </Paper>

                    ))}


                    <Button
                        color="error"
                        variant="outlined"
                        onClick={clearCart}
                    >
                        Clear Cart
                    </Button>

                </Box>


                <Paper
                    sx={{
                        p: 3,
                        height: "fit-content"
                    }}
                >

                    <Typography
                        variant="h5"
                        fontWeight="bold"
                        mb={3}
                    >
                        Order Summary
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent:
                                "space-between",
                            mb: 2
                        }}
                    >

                        <Typography>
                            Items
                        </Typography>

                        <Typography>
                            {cartItems.reduce(
                                (total, item) =>
                                    total + item.quantity,
                                0
                            )}
                        </Typography>

                    </Box>

                    <Divider sx={{ mb: 2 }} />

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent:
                                "space-between",
                            mb: 3
                        }}
                    >

                        <Typography
                            variant="h6"
                            fontWeight="bold"
                        >
                            Total
                        </Typography>

                        <Typography
                            variant="h6"
                            fontWeight="bold"
                        >
                            ₹{totalAmount}
                        </Typography>

                    </Box>

                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        onClick={goToOrders}
                    >
                        Proceed to Order
                    </Button>

                </Paper>

            </Box>

        </Box>
    );
}

export default Cart;