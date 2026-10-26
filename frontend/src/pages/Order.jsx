import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";


function Orders({ goToProducts, refreshCartCount }) {

    const [orders, setOrders] = useState([]);

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");

    const [loading, setLoading] = useState(false);
    const [orderLoading, setOrderLoading] = useState(false);


    const getMyOrders = async () => {

        try {

            const token = localStorage.getItem("token");

            if (!token) {
                return;
            }

           const response = await fetch(
    "http://localhost:3000/getMyOrders",
    {
                    headers: {
                        Authorization: token
                    }
                }
            );

            const data = await response.json();

            if (data.is_successful) {

                setOrders(data.data);

            }

        } catch (error) {

            console.log(
                "My Orders Error:",
                error
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        setLoading(true);

        getMyOrders();

    }, []);


    const placeOrder = async () => {

        if (
            !address ||
            !city ||
            !state ||
            !pincode
        ) {

            alert(
                "Please fill all shipping details"
            );

            return;
        }


        try {

            setOrderLoading(true);

            const token =
                localStorage.getItem("token");


            const response = await fetch(
                "http://localhost:3000/order",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token
                    },

                    body: JSON.stringify({

                        shippingAddress: {
                            address,
                            city,
                            state,
                            pincode
                        }

                    })
                }
            );

            const data = await response.json();


            if (!response.ok ||
                !data.is_successful
            ) {

                alert(
                    data.message ||
                    "Unable to place order"
                );

                return;
            }


            alert(
                "Order placed successfully"
            );


            setAddress("");
            setCity("");
            setState("");
            setPincode("");

            if (refreshCartCount) {
                refreshCartCount();
            }


            await getMyOrders();


        } catch (error) {

            console.log(
                "Place Order Error:",
                error
            );

            alert(
                "Something went wrong"
            );

        } finally {

            setOrderLoading(false);

        }
    };


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
                Orders
            </Typography>


            <Paper
                sx={{
                    p: 3,
                    mb: 5,
                    maxWidth: 700
                }}
            >

                <Typography
                    variant="h5"
                    fontWeight="bold"
                    mb={3}
                >
                    Shipping Address
                </Typography>


                <TextField
                    fullWidth
                    label="Address"
                    value={address}
                    onChange={(e) =>
                        setAddress(e.target.value)
                    }
                    sx={{ mb: 2 }}
                />


                <TextField
                    fullWidth
                    label="City"
                    value={city}
                    onChange={(e) =>
                        setCity(e.target.value)
                    }
                    sx={{ mb: 2 }}
                />


                <TextField
                    fullWidth
                    label="State"
                    value={state}
                    onChange={(e) =>
                        setState(e.target.value)
                    }
                    sx={{ mb: 2 }}
                />


                <TextField
                    fullWidth
                    label="Pincode"
                    value={pincode}
                    onChange={(e) =>
                        setPincode(e.target.value)
                    }
                    sx={{ mb: 3 }}
                />


                <Button
                    variant="contained"
                    size="large"
                    onClick={placeOrder}
                    disabled={orderLoading}
                >
                    {orderLoading
                        ? "Placing Order..."
                        : "Place Order"}
                </Button>

            </Paper>


            <Typography
                variant="h5"
                fontWeight="bold"
                mb={3}
            >
                My Orders
            </Typography>


            {loading ? (

                <Typography>
                    Loading orders...
                </Typography>

            ) : orders.length === 0 ? (

                <Box>

                    <Typography
                        color="text.secondary"
                        mb={2}
                    >
                        You have no orders yet.
                    </Typography>

                    <Button
                        variant="outlined"
                        onClick={goToProducts}
                    >
                        Shop Products
                    </Button>

                </Box>

            ) : (

                <Box>

                    {orders.map((order) => {

                        const total = order.products.reduce(
                            (sum, item) =>
                                sum +
                                item.price *
                                item.quantity,
                            0
                        );

                        return (

                            <Paper
                                key={order._id}
                                sx={{
                                    p: 3,
                                    mb: 3
                                }}
                            >

                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                >
                                    Order ID:
                                    {" "}
                                    {order._id}
                                </Typography>


                                <Typography
                                    sx={{ mt: 1 }}
                                >
                                    Status:
                                    {" "}
                                    <strong>
                                        {order.orderStatus}
                                    </strong>
                                </Typography>


                                <Divider
                                    sx={{ my: 2 }}
                                />


                                {order.products.map(
                                    (item, index) => (

                                        <Box
                                            key={index}
                                            sx={{
                                                display: "flex",
                                                justifyContent:
                                                    "space-between",
                                                mb: 1
                                            }}
                                        >

                                            <Typography>
                                                {item.product?.name}
                                                {" "}
                                                ×
                                                {" "}
                                                {item.quantity}
                                            </Typography>

                                            <Typography>
                                                ₹
                                                {item.price *
                                                    item.quantity}
                                            </Typography>

                                        </Box>

                                    )
                                )}


                                <Divider
                                    sx={{ my: 2 }}
                                />


                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                >
                                    Total: ₹{total}
                                </Typography>


                                <Typography
                                    color="text.secondary"
                                    sx={{ mt: 2 }}
                                >
                                    {order.shippingAddress?.address}
                                    ,{" "}
                                    {order.shippingAddress?.city}
                                    ,{" "}
                                    {order.shippingAddress?.state}
                                    {" - "}
                                    {order.shippingAddress?.pincode}
                                </Typography>

                            </Paper>

                        );

                    })}

                </Box>

            )}

        </Box>
    );
}

export default Orders;
