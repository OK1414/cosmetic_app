import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import Divider from "@mui/material/Divider";

// Icons
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = ({
    goToHome,
    goToLogin,
    goToSignup,
    goToCategories,
    goToProducts,
    goToCart,
    goToOrders,
    goToAdminDashboard,
    cartCount,
    searchQuery = "",
    onSearch
}) => {
    const [searchOpen, setSearchOpen] = useState(Boolean(searchQuery));
    const [searchInput, setSearchInput] = useState(searchQuery || "");
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const [user, setUser] = useState(null);

    // Sync input with external searchQuery changes
    useEffect(() => {
        setSearchInput(searchQuery || "");
        if (searchQuery) {
            setSearchOpen(true);
        }
    }, [searchQuery]);

    // Check if user is logged in
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                setUser(null);
            }
        } else {
            setUser(null);
        }
    }, [anchorEl, mobileDrawerOpen]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setAnchorEl(null);
        setMobileDrawerOpen(false);
        if (goToHome) goToHome();
    };

    const handleSearchIconClick = () => {
        if (!searchOpen) {
            setSearchOpen(true);
        } else {
            if (searchInput.trim()) {
                if (onSearch) onSearch(searchInput);
            } else {
                setSearchOpen(false);
            }
        }
    };

    const handleInputChange = (e) => {
        const val = e.target.value;
        setSearchInput(val);
        if (onSearch) {
            onSearch(val);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            if (onSearch) {
                onSearch(searchInput);
            }
        }
    };

    const handleClear = () => {
        setSearchInput("");
        if (onSearch) {
            onSearch("");
        }
    };

    const closeMobileDrawer = () => {
        setMobileDrawerOpen(false);
    };

    return (
        <AppBar position="sticky" sx={{ zIndex: 1100 }}>
            <Toolbar sx={{ justifyContent: "space-between", px: { xs: 1, sm: 3 } }}>
                {/* Left: Mobile Hamburger & Logo */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    {/* Mobile Hamburger Button */}
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={() => setMobileDrawerOpen(true)}
                        sx={{ mr: 0.5, display: { md: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* Logo / Brand Name */}
                    <Typography
                        variant="h6"
                        sx={{
                            cursor: "pointer",
                            fontWeight: "bold",
                            fontSize: { xs: "1.05rem", sm: "1.3rem", md: "1.4rem" },
                            whiteSpace: "nowrap"
                        }}
                        onClick={goToHome}
                    >
                        Dhion cosmetics
                    </Typography>
                </Box>

                {/* Right: Navigation Links, Search, Cart, Account */}
                <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, md: 1 } }}>
                    {/* Desktop Navigation Links shifted next to Search */}
                    <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1, mr: 1 }}>
                        <Button sx={{ color: "white" }} onClick={goToHome}>
                            Home
                        </Button>
                        <Button sx={{ color: "white" }} onClick={goToProducts}>
                            Products
                        </Button>
                        <Button sx={{ color: "white" }} onClick={goToCategories}>
                            Categories
                        </Button>
                    </Box>

                    {/* Desktop Search Input (Hidden on mobile) */}
                    {searchOpen && (
                        <Box sx={{ display: { xs: "none", md: "block" } }}>
                            <TextField
                                autoFocus
                                size="small"
                                placeholder="Search..."
                                value={searchInput}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                InputProps={{
                                    endAdornment: searchInput ? (
                                        <InputAdornment position="end">
                                            <IconButton
                                                size="small"
                                                onClick={handleClear}
                                                sx={{ padding: "2px" }}
                                            >
                                                <ClearIcon fontSize="small" />
                                            </IconButton>
                                        </InputAdornment>
                                    ) : null
                                }}
                                sx={{
                                    backgroundColor: "white",
                                    borderRadius: 1,
                                    mr: 1,
                                    width: 220,
                                    "& .MuiInputBase-input": {
                                        py: "5px",
                                        fontSize: "0.9rem"
                                    }
                                }}
                            />
                        </Box>
                    )}

                    <IconButton
                        sx={{ color: "white", p: { xs: 0.6, sm: 1 } }}
                        onClick={handleSearchIconClick}
                        title="Search"
                    >
                        <SearchIcon fontSize="medium" />
                    </IconButton>

                    <IconButton
                        color="inherit"
                        onClick={goToCart}
                        title="Cart"
                        sx={{ p: { xs: 0.6, sm: 1 } }}
                    >
                        <Badge badgeContent={cartCount} color="error">
                            <ShoppingCartIcon fontSize="medium" />
                        </Badge>
                    </IconButton>

                    {/* Profile Icon */}
                    <IconButton
                        sx={{ color: "white", p: { xs: 0.6, sm: 1 } }}
                        onClick={(event) => setAnchorEl(event.currentTarget)}
                        title="Account"
                    >
                        <AccountCircleIcon fontSize="medium" />
                    </IconButton>

                    {/* User Dropdown Menu */}
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                    >
                        {user ? (
                            [
                                <MenuItem key="user-email" disabled sx={{ color: "black", fontWeight: "bold" }}>
                                    {user.name || user.email}
                                </MenuItem>,
                                <Divider key="divider-1" />,
                                user.role === "admin" && (
                                    <MenuItem
                                        key="admin-dash"
                                        onClick={() => {
                                            setAnchorEl(null);
                                            if (goToAdminDashboard) goToAdminDashboard();
                                        }}
                                    >
                                        Admin Dashboard
                                    </MenuItem>
                                ),
                                <MenuItem
                                    key="orders"
                                    onClick={() => {
                                        setAnchorEl(null);
                                        if (goToOrders) goToOrders();
                                    }}
                                >
                                    My Orders
                                </MenuItem>,
                                <Divider key="divider-2" />,
                                <MenuItem key="logout" onClick={handleLogout} sx={{ color: "red" }}>
                                    Logout
                                </MenuItem>
                            ]
                        ) : (
                            [
                                <MenuItem
                                    key="login"
                                    onClick={() => {
                                        setAnchorEl(null);
                                        goToLogin();
                                    }}
                                >
                                    Login
                                </MenuItem>,
                                <MenuItem
                                    key="signup"
                                    onClick={() => {
                                        setAnchorEl(null);
                                        goToSignup();
                                    }}
                                >
                                    Signup
                                </MenuItem>
                            ]
                        )}
                    </Menu>
                </Box>
            </Toolbar>

            {/* Mobile Search Bar Dropdown (Shown only on mobile when search is open) */}
            {searchOpen && (
                <Box
                    sx={{
                        display: { xs: "block", md: "none" },
                        px: 2,
                        pb: 1.5,
                        pt: 0.5,
                        backgroundColor: "#1565c0",
                        borderTop: "1px solid rgba(255,255,255,0.15)"
                    }}
                >
                    <TextField
                        autoFocus
                        fullWidth
                        size="small"
                        placeholder="Search products..."
                        value={searchInput}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon fontSize="small" sx={{ color: "#777" }} />
                                </InputAdornment>
                            ),
                            endAdornment: searchInput ? (
                                <InputAdornment position="end">
                                    <IconButton size="small" onClick={handleClear} sx={{ p: 0.5 }}>
                                        <ClearIcon fontSize="small" />
                                    </IconButton>
                                </InputAdornment>
                            ) : null
                        }}
                        sx={{
                            backgroundColor: "white",
                            borderRadius: 2,
                            "& .MuiInputBase-input": { py: "7px", fontSize: "0.9rem" }
                        }}
                    />
                </Box>
            )}

            {/* Mobile Drawer (Left Slide-in) */}
            <Drawer
                anchor="left"
                open={mobileDrawerOpen}
                onClose={closeMobileDrawer}
                PaperProps={{
                    sx: { width: 280, backgroundColor: "#fff" }
                }}
            >
                <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #eee" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#e91e63" }}>
                        Dhion Cosmetics
                    </Typography>
                    <IconButton size="small" onClick={closeMobileDrawer}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <List sx={{ pt: 1 }}>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => { closeMobileDrawer(); goToHome(); }}>
                            <ListItemIcon><HomeIcon color="primary" /></ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton onClick={() => { closeMobileDrawer(); goToProducts(); }}>
                            <ListItemIcon><InventoryIcon color="primary" /></ListItemIcon>
                            <ListItemText primary="Products" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton onClick={() => { closeMobileDrawer(); goToCategories(); }}>
                            <ListItemIcon><CategoryIcon color="primary" /></ListItemIcon>
                            <ListItemText primary="Categories" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton onClick={() => { closeMobileDrawer(); goToCart(); }}>
                            <ListItemIcon>
                                <Badge badgeContent={cartCount} color="error">
                                    <ShoppingCartIcon color="primary" />
                                </Badge>
                            </ListItemIcon>
                            <ListItemText primary="My Cart" />
                        </ListItemButton>
                    </ListItem>

                    {user && (
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => { closeMobileDrawer(); if (goToOrders) goToOrders(); }}>
                                <ListItemIcon><ShoppingBagIcon color="primary" /></ListItemIcon>
                                <ListItemText primary="My Orders" />
                            </ListItemButton>
                        </ListItem>
                    )}

                    {user?.role === "admin" && (
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => { closeMobileDrawer(); if (goToAdminDashboard) goToAdminDashboard(); }}>
                                <ListItemIcon><AdminPanelSettingsIcon color="secondary" /></ListItemIcon>
                                <ListItemText primary="Admin Dashboard" sx={{ color: "#d81b60", fontWeight: "bold" }} />
                            </ListItemButton>
                        </ListItem>
                    )}
                </List>

                <Divider sx={{ my: 1 }} />

                {/* Bottom Auth Section in Drawer */}
                <Box sx={{ mt: "auto", p: 2 }}>
                    {user ? (
                        <Box disablePadding>
                            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1 }}>
                                Logged in as: <strong>{user.name || user.email}</strong>
                            </Typography>
                            <Button
                                fullWidth
                                variant="outlined"
                                color="error"
                                startIcon={<LogoutIcon />}
                                onClick={handleLogout}
                                sx={{ borderRadius: 2, textTransform: "none" }}
                            >
                                Logout
                            </Button>
                        </Box>
                    ) : (
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Button
                                fullWidth
                                variant="contained"
                                startIcon={<LoginIcon />}
                                onClick={() => { closeMobileDrawer(); goToLogin(); }}
                                sx={{ borderRadius: 2, textTransform: "none" }}
                            >
                                Login
                            </Button>
                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={<PersonAddIcon />}
                                onClick={() => { closeMobileDrawer(); goToSignup(); }}
                                sx={{ borderRadius: 2, textTransform: "none" }}
                            >
                                Sign Up
                            </Button>
                        </Box>
                    )}
                </Box>
            </Drawer>
        </AppBar>
    );
};

export default Navbar;
