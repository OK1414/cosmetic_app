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

import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";


function AdminDashboard({
    goToCategories,
    goToProducts
}) {

    const drawerWidth = 240;


    // ==========================================
    // COUNTS
    // ==========================================

    const [categoryCount, setCategoryCount] = useState(0);

    const [productCount, setProductCount] = useState(0);

    const [userCount, setUserCount] = useState(0);


    // ==========================================
    // GET CATEGORY COUNT
    // ==========================================

    const getCategoryCount = async () => {

        try {

            const response = await fetch(
                "http://localhost:3000/getCategory"
            );

            const data = await response.json();

            if (data.is_successful) {

                setCategoryCount(
                    data.data.length
                );

            }

        } catch (error) {

            console.log(
                "Category Count Error:",
                error
            );

        }
    };


    // ==========================================
    // GET PRODUCT COUNT
    // ==========================================

    const getProductCount = async () => {

        try {

            const response = await fetch(
                "http://localhost:3000/getProduct"
            );

            const data = await response.json();

            if (data.is_successful) {

                setProductCount(
                    data.data.length
                );

            }

        } catch (error) {

            console.log(
                "Product Count Error:",
                error
            );

        }
    };
    


    const getUserCount = async () => {
    try {

        const response = await fetch(
            "http://localhost:3000/getUsers"
        );

        const data = await response.json();

        if (data.is_successful) {
            setUserCount(data.data.length);
        }

    } catch (error) {
        console.log("User Count Error:", error);
    }
};

    // ==========================================
    // LOAD COUNTS
    // ==========================================

    useEffect(() => {

        getCategoryCount();

        getProductCount();

        getUserCount();

    }, []);


    // ==========================================
    // LOGOUT
    // ==========================================

    const handleLogout = () => {

        localStorage.removeItem("token");

        window.location.reload();

    };


    return (

        <Box
            sx={{
                display: "flex",
                minHeight: "100vh"
            }}
        >

            {/* ==================================
                SIDEBAR
            ================================== */}

            <Drawer
                variant="permanent"

                sx={{
                    width: drawerWidth,

                    flexShrink: 0,

                    "& .MuiDrawer-paper": {

                        width: drawerWidth,

                        boxSizing: "border-box"
                    }
                }}
            >

                {/* ADMIN TITLE */}

                <Box
                    sx={{
                        padding: 2,

                        textAlign: "center",

                        borderBottom:
                            "1px solid #ddd"
                    }}
                >

                    <Typography
                        variant="h5"

                        sx={{
                            fontWeight: "bold"
                        }}
                    >
                        Admin Panel
                    </Typography>

                </Box>


                {/* SIDEBAR MENU */}

                <List>


                    {/* DASHBOARD */}

                    <ListItem disablePadding>

                        <ListItemButton>

                            <ListItemIcon>

                                <DashboardIcon />

                            </ListItemIcon>

                            <ListItemText
                                primary="Dashboard"
                            />

                        </ListItemButton>

                    </ListItem>



                    {/* CATEGORIES */}

                    <ListItem disablePadding>

                        <ListItemButton
                            onClick={goToCategories}
                        >

                            <ListItemIcon>

                                <CategoryIcon />

                            </ListItemIcon>

                            <ListItemText
                                primary="Categories"
                            />

                        </ListItemButton>

                    </ListItem>



                    {/* PRODUCTS */}

                    <ListItem disablePadding>

                        <ListItemButton
                            onClick={goToProducts}
                        >

                            <ListItemIcon>

                                <InventoryIcon />

                            </ListItemIcon>

                            <ListItemText
                                primary="Products"
                            />

                        </ListItemButton>

                    </ListItem>



                    {/* USERS */}

                    <ListItem disablePadding>

                        <ListItemButton>

                            <ListItemIcon>

                                <PeopleIcon />

                            </ListItemIcon>

                            <ListItemText
                                primary="Users"
                            />

                        </ListItemButton>

                    </ListItem>



                    {/* ORDERS */}

                    <ListItem disablePadding>

                        <ListItemButton>

                            <ListItemIcon>

                                <ShoppingCartIcon />

                            </ListItemIcon>

                            <ListItemText
                                primary="Orders"
                            />

                        </ListItemButton>

                    </ListItem>

                </List>


                {/* ==================================
                    LOGOUT
                ================================== */}

                <Box
                    sx={{
                        marginTop: "auto"
                    }}
                >

                    <List>

                        <ListItem disablePadding>

                            <ListItemButton
                                onClick={handleLogout}
                            >

                                <ListItemIcon>

                                    <LogoutIcon />

                                </ListItemIcon>

                                <ListItemText
                                    primary="Logout"
                                />

                            </ListItemButton>

                        </ListItem>

                    </List>

                </Box>

            </Drawer>


            {/* ==================================
                DASHBOARD CONTENT
            ================================== */}

            <Box
                component="main"

                sx={{
                    flexGrow: 1,

                    padding: 4,

                    backgroundColor: "#f5f5f5"
                }}
            >

                <Typography
                    variant="h4"

                    sx={{
                        fontWeight: "bold",

                        mb: 4
                    }}
                >
                    Dashboard
                </Typography>


                {/* ==================================
                    DASHBOARD CARDS
                ================================== */}

                <Box
                    sx={{
                        display: "grid",

                        gridTemplateColumns: {

                            xs: "1fr",

                            sm: "repeat(2, 1fr)",

                            md: "repeat(4, 1fr)"
                        },

                        gap: 3
                    }}
                >


                    {/* CATEGORY CARD */}

                    <Paper
                        sx={{
                            padding: 3
                        }}
                    >

                        <Typography
                            variant="h6"
                        >
                            Categories
                        </Typography>

                        <Typography
                            variant="h3"
                        >
                            {categoryCount}
                        </Typography>

                    </Paper>



                    {/* PRODUCT CARD */}

                    <Paper
                        sx={{
                            padding: 3,

                            cursor: "pointer",

                            transition:
                                "all 0.3s ease",

                            "&:hover": {

                                transform:
                                    "translateY(-5px)",

                                boxShadow: 5
                            }
                        }}

                        onClick={goToProducts}
                    >

                        <Typography
                            variant="h6"
                        >
                            Products
                        </Typography>

                        <Typography
                            variant="h3"
                        >
                            {productCount}
                        </Typography>

                    </Paper>



                    {/* USERS CARD */}

                    <Paper
                        sx={{
                            padding: 3
                        }}
                    >

                        <Typography
                            variant="h6"
                        >
                            Users
                        </Typography>

                        <Typography
                            variant="h3"
                        >
                           {userCount}
                        </Typography>

                    </Paper>



                    {/* ORDERS CARD */}

                    <Paper
                        sx={{
                            padding: 3
                        }}
                    >

                        <Typography
                            variant="h6"
                        >
                            Orders
                        </Typography>

                        <Typography
                            variant="h3"
                        >
                            0
                        </Typography>

                    </Paper>

                </Box>

            </Box>

        </Box>
    );
}


export default AdminDashboard;