import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import lipstickImage from "../assets/lipstick.jpg";

function ProductCard({ product, onAddToCart }) {

    return (
        <Card
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 2
            }}
        >

            <CardMedia
                component="img"
                height="250"
                image={lipstickImage}
                alt={product.name}
            />

            <CardContent sx={{ flexGrow: 1 }}>

                <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold" }}
                >
                    {product.name}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                >
                    {product.description}
                </Typography>

                <Typography
                    variant="h6"
                    sx={{
                        mt: 2,
                        fontWeight: "bold"
                    }}
                >
                    ₹{product.price}
                </Typography>

            </CardContent>

            <Box sx={{ p: 2 }}>

                <Button
                    variant="contained"
                    fullWidth
                    onClick={() => onAddToCart(product)}
                >
                    Add to Cart
                </Button>

            </Box>

        </Card>
    );
}

export default ProductCard;