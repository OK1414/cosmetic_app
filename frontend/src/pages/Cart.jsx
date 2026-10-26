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
                    (data.data?.items || []).filter(item => item && item.product)
                );
                if (refreshCartCount) {
                    refreshCartCount();
                }
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

    const updateQuantity = async (productId, quantity) => {
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
                setCartItems(data.data.items);
                if (refreshCartCount) {
                    refreshCartCount();
                }
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.log("Update Quantity Error:", error);
        }
    };

    const increaseQuantity = (item) => {
        updateQuantity(item.product._id, item.quantity + 1);
    };

    const decreaseQuantity = (item) => {
        if (item.quantity === 1) {
            removeItem(item.product._id);
            return;
        }
        updateQuantity(item.product._id, item.quantity - 1);
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
                setCartItems(data.data.items);
                if (refreshCartCount) {
                    refreshCartCount();
                }
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.log("Remove Cart Error:", error);
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
            console.log("Clear Cart Error:", error);
        }
    };

    const totalAmount = cartItems.reduce((total, item) => {
        return total + (item.product ? item.product.price : 0) * (item.quantity || 1);
    }, 0);

    if (loading) {
        return (
            <Box sx={{ p: { xs: 3, md: 5 }, textAlign: "center" }}>
                <Typography>Loading cart...</Typography>
            </Box>
        );
    }

    if (cartItems.length === 0) {
        return (
            <Box sx={{ textAlign: "center", py: { xs: 6, md: 10 }, px: 2 }}>
                <Typography variant="h4" fontWeight="bold" mb={2} sx={{ fontSize: { xs: "1.8rem", sm: "2.2rem" } }}>
                    Your Cart is Empty
                </Typography>
                <Typography color="text.secondary" mb={3}>
                    Add some products to your cart.
                </Typography>
                <Button variant="contained" onClick={goToProducts} sx={{ borderRadius: 2, textTransform: "none", px: 4 }}>
                    Continue Shopping
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ p: { xs: 2, sm: 3, md: 5 }, maxWidth: 1200, mx: "auto" }}>
            <Typography variant="h4" fontWeight="bold" mb={{ xs: 2, md: 4 }} sx={{ fontSize: { xs: "1.8rem", sm: "2.2rem" } }}>
                My Cart ({cartItems.length})
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "2fr 1fr"
                    },
                    gap: { xs: 3, md: 4 }
                }}
            >
                <Box>
                    {cartItems.map((item) => (
                        <Paper
                            key={item.product._id}
                            sx={{
                                p: 2,
                                mb: 2,
                                borderRadius: 2
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: { xs: "column", sm: "row" },
                                    alignItems: { xs: "flex-start", sm: "center" },
                                    justifyContent: "space-between",
                                    gap: 2
                                }}
                            >
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        {item.product.name}
                                    </Typography>
                                    <Typography color="primary" fontWeight="bold">
                                        ₹{item.product.price}
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        width: { xs: "100%", sm: "auto" },
                                        gap: 1
                                    }}
                                >
                                    <Box sx={{ display: "flex", alignItems: "center", border: "1px solid #ddd", borderRadius: 1.5, p: 0.3 }}>
                                        <IconButton size="small" onClick={() => decreaseQuantity(item)}>
                                            <RemoveIcon fontSize="small" />
                                        </IconButton>
                                        <Typography sx={{ mx: 1.5, fontWeight: "bold", minWidth: 20, textAlign: "center" }}>
                                            {item.quantity}
                                        </Typography>
                                        <IconButton size="small" onClick={() => increaseQuantity(item)}>
                                            <AddIcon fontSize="small" />
                                        </IconButton>
                                    </Box>

                                    <IconButton
                                        color="error"
                                        size="small"
                                        onClick={() => removeItem(item.product._id)}
                                        title="Remove item"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Paper>
                    ))}

                    <Button
                        color="error"
                        variant="outlined"
                        size="small"
                        onClick={clearCart}
                        sx={{ mt: 1, borderRadius: 2, textTransform: "none" }}
                    >
                        Clear Cart
                    </Button>
                </Box>

                <Paper
                    sx={{
                        p: { xs: 2.5, sm: 3 },
                        height: "fit-content",
                        borderRadius: 3,
                        boxShadow: 2
                    }}
                >
                    <Typography variant="h5" fontWeight="bold" mb={2.5}>
                        Order Summary
                    </Typography>

                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                        <Typography color="text.secondary">Total Items</Typography>
                        <Typography fontWeight="bold">
                            {cartItems.reduce((total, item) => total + item.quantity, 0)}
                        </Typography>
                    </Box>

                    <Divider sx={{ mb: 2 }} />

                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                        <Typography variant="h6" fontWeight="bold">
                            Grand Total
                        </Typography>
                        <Typography variant="h6" fontWeight="bold" color="primary">
                            ₹{totalAmount}
                        </Typography>
                    </Box>

                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        onClick={goToOrders}
                        sx={{ borderRadius: 2, py: 1.4, textTransform: "none", fontWeight: "bold" }}
                    >
                        Proceed to Checkout
                    </Button>
                </Paper>
            </Box>
        </Box>
    );
}

export default Cart;
