import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

import ProductCard from "../components/productCard";

function Product({
    refreshCartCount,
    selectedCategoryId,
    onClearCategory,
    goToCategories,
    searchQuery = "",
    onSearchChange,
    onClearSearch
}) {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const getProducts = async () => {
        try {
            const response = await fetch("http://13.203.77.175:3000/getProduct");
            const data = await response.json();
            if (data.is_successful) {
                setProducts(data.data || []);
            }
        } catch (error) {
            console.log("Product Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const getCategories = async () => {
        try {
            const response = await fetch("http://13.203.77.175:3000/getCategory");
            const data = await response.json();
            if (data.is_successful) {
                setCategories(data.data || []);
            }
        } catch (error) {
            console.log("Category Fetch Error:", error);
        }
    };

    const addToCart = async (product) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please login first");
                return;
            }

            const response = await fetch("http://13.203.77.175:3000/addToCart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                },
                body: JSON.stringify({
                    productId: product._id,
                    quantity: 1
                })
            });

            const data = await response.json();

            if (!response.ok || !data.is_successful) {
                alert(data.message || "Unable to add product");
                return;
            }

            alert("Product added to cart");

            if (refreshCartCount) {
                refreshCartCount();
            }
        } catch (error) {
            console.log("Add To Cart Error:", error);
            alert("Something went wrong");
        }
    };

    useEffect(() => {
        getProducts();
        getCategories();
    }, []);

    // Find current category name if selected
    const currentCategory = categories.find((c) => c._id === selectedCategoryId);
    const categoryName = currentCategory ? currentCategory.name : "";

    // Filter products by category and search query
    const q = (searchQuery || "").trim().toLowerCase();
    const displayedProducts = products.filter((p) => {
        const matchesCategory = selectedCategoryId
            ? (p.categoryId || p.category?._id || p.category) === selectedCategoryId
            : true;

        const matchesSearch =
            q === "" ||
            (p.name && p.name.toLowerCase().includes(q)) ||
            (p.description && p.description.toLowerCase().includes(q));

        return matchesCategory && matchesSearch;
    });

    return (
        <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, py: { xs: 3, sm: 4 }, minHeight: "80vh" }}>
            <Typography
                variant="h4"
                sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    mb: 2,
                    fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" }
                }}
            >
                Our Products
            </Typography>

            {/* In-Page Responsive Search Bar */}
            <Box sx={{ maxWidth: 550, width: "100%", mx: "auto", mb: 3 }}>
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Search products by name or description..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                        endAdornment: searchQuery ? (
                            <InputAdornment position="end">
                                <IconButton
                                    size="small"
                                    onClick={onClearSearch}
                                    sx={{ padding: "2px" }}
                                >
                                    <ClearIcon fontSize="small" />
                                </IconButton>
                            </InputAdornment>
                        ) : null
                    }}
                    sx={{
                        backgroundColor: "white",
                        borderRadius: 2,
                        boxShadow: 1
                    }}
                />
            </Box>

            {/* Active Filters Bar */}
            {(selectedCategoryId || searchQuery) && (
                <Box
                    sx={{
                        mb: 3,
                        p: { xs: 1.5, sm: 2 },
                        backgroundColor: "#f9f9f9",
                        borderRadius: 2,
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        justifyContent: "space-between",
                        alignItems: { xs: "flex-start", sm: "center" },
                        gap: 1.5
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                            Filters:
                        </Typography>
                        {selectedCategoryId && (
                            <Chip
                                size="small"
                                label={`Category: ${categoryName || "Selected"}`}
                                color="primary"
                                variant="outlined"
                                onDelete={onClearCategory}
                            />
                        )}
                        {searchQuery && (
                            <Chip
                                size="small"
                                label={`Search: "${searchQuery}"`}
                                color="secondary"
                                variant="outlined"
                                onDelete={onClearSearch}
                            />
                        )}
                        <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
                            ({displayedProducts.length} items found)
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: 1, width: { xs: "100%", sm: "auto" }, justifyContent: { xs: "flex-end", sm: "flex-start" } }}>
                        {selectedCategoryId && (
                            <Button variant="outlined" size="small" onClick={onClearCategory} sx={{ textTransform: "none", fontSize: "0.8rem" }}>
                                All Categories
                            </Button>
                        )}
                        {searchQuery && (
                            <Button variant="outlined" size="small" color="secondary" onClick={onClearSearch} sx={{ textTransform: "none", fontSize: "0.8rem" }}>
                                Clear Search
                            </Button>
                        )}
                    </Box>
                </Box>
            )}

            {/* Products Grid or Empty / Loading State */}
            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                    <CircularProgress />
                </Box>
            ) : displayedProducts.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 6, px: 2 }}>
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 1, fontSize: { xs: "1.1rem", sm: "1.25rem" } }}>
                        No products found matching your search.
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Try searching with different keywords or clear the active filters.
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => {
                            if (onClearSearch) onClearSearch();
                            if (onClearCategory) onClearCategory();
                        }}
                    >
                        Show All Products
                    </Button>
                </Box>
            ) : (
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "repeat(2, 1fr)",
                            md: "repeat(3, 1fr)",
                            lg: "repeat(4, 1fr)"
                        },
                        gap: { xs: 2.5, sm: 3 }
                    }}
                >
                    {displayedProducts.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            onAddToCart={addToCart}
                        />
                    ))}
                </Box>
            )}
        </Box>
    );
}

export default Product;
