import { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextField from "@mui/material/TextField";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";

const Navbar = ({ goToHome, goToLogin, goToSignup, goToCategories, goToProducts, goToCart, cartCount }) => {
    const [searchOpen, setSearchOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);



    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Dhion cosmetics
                </Typography>
                <Box>
                    <Button sx={{ color: "white" }}
                    onClick={goToHome}
                    >
                        Home
                    </Button>

                    <Button
                        sx={{ color: "white" }}
                        onClick={goToProducts}
                    >
                        Products
                    </Button>
                    <Button sx={{ color: "white" }}
                        onClick={goToCategories}
                    >
                        Categories
                    </Button>

                    {searchOpen && (
                        <TextField
                            size="small"
                            placeholder="Search products..."
                            sx={{
                                backgroundColor: "white",
                                borderRadius: 1
                            }}
                        />
                    )}
                    <IconButton sx={{ color: "white" }}
                        onClick={() => setSearchOpen(!searchOpen)}>
                        <SearchIcon />
                    </IconButton>

                    <IconButton
    color="inherit"
    onClick={goToCart}
>
    <Badge badgeContent={cartCount} color="error">
        <ShoppingCartIcon />
    </Badge>
</IconButton>

                    <IconButton
                        sx={{ color: "white" }}
                        onClick={(event) => setAnchorEl(event.currentTarget)}
                    >
                        <AccountCircleIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                    >
                        <MenuItem
                            onClick={() => {
                                setAnchorEl(null);
                                goToLogin();
                            }}
                        >
                            Login
                        </MenuItem>

                        <MenuItem
                            onClick={() => {
                                setAnchorEl(null);
                                goToSignup();
                            }}
                        >
                            Signup
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
export default Navbar 