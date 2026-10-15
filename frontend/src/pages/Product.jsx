import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import ProductCard from "../components/productCard";

function Product({ goToCart, refreshCartCount }) {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const getProducts = async () => {

        try {

            const response = await fetch(
                "http://localhost:3000/getProduct"
            );

            const data = await response.json();

            if (data.is_successful) {
                setProducts(data.data);
            }

        } catch (error) {

            console.log("Product Error:", error);

        } finally {

            setLoading(false);

        }
    };


    const addToCart = async (product) => {

        try {

            const token = localStorage.getItem("token");

            if (!token) {

                alert("Please login first");
                return;

            }

            const response = await fetch(
                "http://localhost:3000/addToCart",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token
                    },

                    body: JSON.stringify({
                        productId: product._id,
                        quantity: 1
                    })
                }
            );

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

    }, []);


    return (
        <Box sx={{ padding: 4 }}>

            <Typography
                variant="h4"
                sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    mb: 4
                }}
            >
                Our Products
            </Typography>


            {loading ? (

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: 5
                    }}
                >
                    <CircularProgress />
                </Box>

            ) : products.length === 0 ? (

                <Typography
                    textAlign="center"
                >
                    No products available
                </Typography>

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
                        gap: 3
                    }}
                >

                    {products.map((product) => (

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