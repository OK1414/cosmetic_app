import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";

function AdminDashboard({
    goToCategories,
    goToProducts,
    goToHome,
    goToUsers,
    goToOrders
}) {
    const drawerWidth = 240;
    const [mobileOpen, setMobileOpen] = useState(false);

    // ==========================================
    // COUNTS
    // ==========================================
    const [categoryCount, setCategoryCount] = useState(0);
    const [productCount, setProductCount] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const [orderCount, setOrderCount] = useState(0);

    const getCategoryCount = async () => {
        try {
            const response = await fetch("http://13.203.77.175:3000/getCategory");
            const data = await response.json();
            if (data.is_successful) {
                setCategoryCount(data.data.length);
            }
        } catch (error) {
            console.log("Category Count Error:", error);
        }
    };

    const getProductCount = async () => {
        try {
            const response = await fetch("http://13.203.77.175:3000/getProduct");
            const data = await response.json();
            if (data.is_successful) {
                setProductCount(data.data.length);
            }
        } catch (error) {
            console.log("Product Count Error:", error);
        }
    };

    const getUserCount = async () => {
        try {
            const response = await fetch("http://13.203.77.175:3000/getUsers");
            const data = await response.json();
            if (data.is_successful) {
                setUserCount(data.data.length);
            }
        } catch (error) {
            console.log("User Count Error:", error);
        }
    };

    const getOrderCount = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://13.203.77.175:3000/getOrder", {
                headers: {
                    Authorization: token
                }
            });
            const data = await response.json();
            if (data.is_successful) {
                setOrderCount(data.data.length);
            }
        } catch (error) {
            console.log("Order Count Error:", error);
        }
    };

    useEffect(() => {
        getCategoryCount();
        getProductCount();
        getUserCount();
        getOrderCount();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        if (goToHome) {
            goToHome();
        }
        window.location.reload();
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const sidebarContent = (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            {/* ADMIN TITLE */}
            <Box
                sx={{
                    padding: 2,
                    textAlign: "center",
                    borderBottom: "1px solid #ddd"
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1976d2" }}>
                    Admin Panel
                </Typography>
            </Box>

            {/* SIDEBAR MENU */}
            <List>
                {/* HOME */}
                <ListItem disablePadding>
                    <ListItemButton onClick={() => { setMobileOpen(false); goToHome(); }}>
                        <ListItemIcon><HomeIcon /></ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>

                {/* DASHBOARD */}
                <ListItem disablePadding>
                    <ListItemButton selected onClick={() => setMobileOpen(false)}>
                        <ListItemIcon><DashboardIcon /></ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </ListItem>

                {/* CATEGORIES */}
                <ListItem disablePadding>
                    <ListItemButton onClick={() => { setMobileOpen(false); goToCategories(); }}>
                        <ListItemIcon><CategoryIcon /></ListItemIcon>
                        <ListItemText primary="Categories" />
                    </ListItemButton>
                </ListItem>

                {/* PRODUCTS */}
                <ListItem disablePadding>
                    <ListItemButton onClick={() => { setMobileOpen(false); goToProducts(); }}>
                        <ListItemIcon><InventoryIcon /></ListItemIcon>
                        <ListItemText primary="Products" />
                    </ListItemButton>
                </ListItem>

                {/* USERS */}
                <ListItem disablePadding>
                    <ListItemButton onClick={() => { setMobileOpen(false); goToUsers(); }}>
                        <ListItemIcon><PeopleIcon /></ListItemIcon>
                        <ListItemText primary="Users" />
                    </ListItemButton>
                </ListItem>

                {/* ORDERS */}
                <ListItem disablePadding>
                    <ListItemButton onClick={() => { setMobileOpen(false); goToOrders(); }}>
                        <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
                        <ListItemText primary="Orders" />
                    </ListItemButton>
                </ListItem>
            </List>

            {/* LOGOUT */}
            <Box sx={{ marginTop: "auto" }}>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleLogout} sx={{ color: "red" }}>
                            <ListItemIcon><LogoutIcon sx={{ color: "red" }} /></ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
            {/* Top Bar for Mobile */}
            <AppBar
                position="fixed"
                sx={{
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    ml: { md: `${drawerWidth}px` },
                    display: { md: "none" },
                    backgroundColor: "#1976d2"
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap sx={{ fontWeight: "bold" }}>
                        Admin Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Mobile Drawer (Temporary) */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: "block", md: "none" },
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box"
                    }
                }}
            >
                {sidebarContent}
            </Drawer>

            {/* Desktop Drawer (Permanent) */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", md: "block" },
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box"
                    }
                }}
                open
            >
                {sidebarContent}
            </Drawer>

            {/* DASHBOARD CONTENT */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    padding: { xs: 2.5, sm: 3, md: 4 },
                    mt: { xs: 7, md: 0 },
                    backgroundColor: "#f5f5f5",
                    minHeight: "100vh"
                }}
            >
                <Typography variant="h4" sx={{ fontWeight: "bold", mb: { xs: 2.5, md: 4 }, fontSize: { xs: "1.7rem", sm: "2.1rem" } }}>
                    Dashboard
                </Typography>

                {/* DASHBOARD CARDS */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "repeat(2, 1fr)",
                            md: "repeat(4, 1fr)"
                        },
                        gap: { xs: 2, sm: 3 }
                    }}
                >
                    {/* CATEGORY CARD */}
                    <Paper
                        sx={{
                            padding: 3,
                            borderRadius: 2,
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            "&:hover": {
                                transform: "translateY(-5px)",
                                boxShadow: 5
                            }
                        }}
                        onClick={goToCategories}
                    >
                        <Typography variant="h6" color="text.secondary">Categories</Typography>
                        <Typography variant="h3" sx={{ fontWeight: "bold", mt: 1 }}>{categoryCount}</Typography>
                    </Paper>

                    {/* PRODUCT CARD */}
                    <Paper
                        sx={{
                            padding: 3,
                            borderRadius: 2,
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            "&:hover": {
                                transform: "translateY(-5px)",
                                boxShadow: 5
                            }
                        }}
                        onClick={goToProducts}
                    >
                        <Typography variant="h6" color="text.secondary">Products</Typography>
                        <Typography variant="h3" sx={{ fontWeight: "bold", mt: 1 }}>{productCount}</Typography>
                    </Paper>

                    {/* USERS CARD */}
                    <Paper
                        sx={{
                            padding: 3,
                            borderRadius: 2,
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            "&:hover": {
                                transform: "translateY(-5px)",
                                boxShadow: 5
                            }
                        }}
                        onClick={goToUsers}
                    >
                        <Typography variant="h6" color="text.secondary">Users</Typography>
                        <Typography variant="h3" sx={{ fontWeight: "bold", mt: 1 }}>{userCount}</Typography>
                    </Paper>

                    {/* ORDERS CARD */}
                    <Paper
                        sx={{
                            padding: 3,
                            borderRadius: 2,
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            "&:hover": {
                                transform: "translateY(-5px)",
                                boxShadow: 5
                            }
                        }}
                        onClick={goToOrders}
                    >
                        <Typography variant="h6" color="text.secondary">Orders</Typography>
                        <Typography variant="h3" sx={{ fontWeight: "bold", mt: 1 }}>{orderCount}</Typography>
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
}

export default AdminDashboard;
