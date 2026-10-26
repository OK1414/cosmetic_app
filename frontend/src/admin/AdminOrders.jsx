import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RefreshIcon from "@mui/icons-material/Refresh";

function AdminOrders({ goToAdminDashboard }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const getOrders = async () => {
        setLoading(true);
        setErrorMessage("");
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                setErrorMessage("You are not logged in. Please log in as Admin.");
                setLoading(false);
                return;
            }

            const response = await fetch("http://13.203.77.175:3000/getOrder", {
                headers: {
                    Authorization: token
                }
            });

            const data = await response.json();

            if (data.is_successful) {
                setOrders(data.data || []);
            } else {
                setErrorMessage(data.message || "Failed to fetch orders.");
            }
        } catch (error) {
            console.log("Get Orders Error:", error);
            setErrorMessage("Cannot connect to server. Make sure backend is running.");
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://13.203.77.175:3000/updateOrder/${orderId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                },
                body: JSON.stringify({ orderStatus: newStatus })
            });
            const data = await response.json();
            if (data.is_successful) {
                setOrders((prev) =>
                    prev.map((ord) => (ord._id === orderId ? { ...ord, orderStatus: newStatus } : ord))
                );
            } else {
                alert(data.message || "Failed to update order status");
            }
        } catch (error) {
            console.log("Update Order Status Error:", error);
            alert("Error updating order status");
        }
    };

    useEffect(() => {
        getOrders();
    }, []);

    const formatAddress = (addr) => {
        if (!addr) return "Not provided";
        if (typeof addr === "string") return addr;
        if (typeof addr === "object") {
            const parts = [addr.address, addr.city, addr.state, addr.pincode].filter(Boolean);
            return parts.length > 0 ? parts.join(", ") : "Not provided";
        }
        return "Not provided";
    };

    const calculateTotal = (products = []) => {
        return products.reduce((acc, item) => {
            const price = item.price || item.product?.price || 0;
            const quantity = item.quantity || 1;
            return acc + price * quantity;
        }, 0);
    };

    return (
        <Box sx={{ minHeight: "100vh", backgroundColor: "#fff5f7", p: { xs: 2, sm: 3, md: 5 } }}>
            {/* Top Bar */}
            <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 1.5 }}>
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={goToAdminDashboard}
                    sx={{ borderRadius: 2, textTransform: "none", fontWeight: "bold" }}
                >
                    Back to Dashboard
                </Button>
                <Button
                    variant="contained"
                    startIcon={<RefreshIcon />}
                    onClick={getOrders}
                    sx={{ borderRadius: 2, textTransform: "none" }}
                >
                    Refresh Orders
                </Button>
            </Box>

            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2, fontSize: { xs: "1.7rem", sm: "2.1rem" } }}>
                Customer Orders ({orders.length})
            </Typography>

            {/* Error Message if API fails */}
            {errorMessage && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {errorMessage}
                </Alert>
            )}

            <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3, overflowX: "auto" }}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead sx={{ backgroundColor: "#1976d2" }}>
                        <TableRow>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Order ID</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Customer</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Items</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Shipping Address</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Total (₹)</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                                    <Typography color="text.secondary">Loading orders...</Typography>
                                </TableCell>
                            </TableRow>
                        ) : orders.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                                    <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                                        No Orders Placed Yet
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        When a customer adds products to cart and clicks "Place Order", the order will appear here.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            orders.map((order) => (
                                <TableRow key={order._id} hover>
                                    <TableCell sx={{ fontSize: "0.85rem", color: "#666", fontWeight: "medium" }}>
                                        #{order._id.slice(-6).toUpperCase()}
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                                            {order.user?.name || "Customer"}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: "#777" }}>
                                            {order.user?.email || "No email"}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        {(order.products || []).map((p, idx) => (
                                            <Typography key={idx} variant="body2">
                                                • {p.product?.name || "Product"} {p.quantity ? `× ${p.quantity}` : ""}
                                            </Typography>
                                        ))}
                                    </TableCell>
                                    <TableCell sx={{ maxWidth: 220 }}>
                                        <Typography variant="body2">
                                            {formatAddress(order.shippingAddress)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: "bold", color: "#2e7d32" }}>
                                        ₹{calculateTotal(order.products)}
                                    </TableCell>
                                    <TableCell>
                                        <FormControl size="small">
                                            <Select
                                                value={order.orderStatus || "Pending"}
                                                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                sx={{ minWidth: 130, height: 36, fontSize: "0.85rem" }}
                                            >
                                                <MenuItem value="Pending">Pending</MenuItem>
                                                <MenuItem value="Confirmed">Confirmed</MenuItem>
                                                <MenuItem value="Processing">Processing</MenuItem>
                                                <MenuItem value="Shipped">Shipped</MenuItem>
                                                <MenuItem value="Delivered">Delivered</MenuItem>
                                                <MenuItem value="Cancelled">Cancelled</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default AdminOrders;
