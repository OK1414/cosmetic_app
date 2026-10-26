import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import lipstickImage from "../assets/lipstick.jpg";

function ProductCard({ product, onAddToCart }) {
    return (
        <Card
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 3,
                boxShadow: 2,
                transition: "all 0.3s ease",
                "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: 6
                }
            }}
        >
            <CardMedia
                component="img"
                image={lipstickImage}
                alt={product.name}
                sx={{
                    height: { xs: 200, sm: 230 },
                    objectFit: "cover"
                }}
            />

            <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 2.5 } }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: "bold",
                        fontSize: { xs: "1.05rem", sm: "1.2rem" },
                        lineHeight: 1.3
                    }}
                >
                    {product.name}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mt: 1,
                        fontSize: { xs: "0.82rem", sm: "0.875rem" },
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden"
                    }}
                >
                    {product.description}
                </Typography>

                <Typography
                    variant="h6"
                    sx={{
                        mt: 2,
                        fontWeight: "bold",
                        color: "#d81b60",
                        fontSize: { xs: "1.1rem", sm: "1.25rem" }
                    }}
                >
                    ₹{product.price}
                </Typography>
            </CardContent>

            <Box sx={{ p: { xs: 1.5, sm: 2 }, pt: 0 }}>
                <Button
                    variant="contained"
                    fullWidth
                    startIcon={<AddShoppingCartIcon />}
                    onClick={() => onAddToCart(product)}
                    sx={{
                        borderRadius: 2,
                        py: 1,
                        fontWeight: "bold",
                        textTransform: "none",
                        backgroundColor: "#e91e63",
                        "&:hover": {
                            backgroundColor: "#c2185b"
                        }
                    }}
                >
                    Add to Cart
                </Button>
            </Box>
        </Card>
    );
}

export default ProductCard;
