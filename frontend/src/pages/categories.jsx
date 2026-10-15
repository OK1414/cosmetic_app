import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

function Categories() {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const getCategories = async () => {
        try {
            const response = await fetch(
                "http://localhost:3000/getCategory"
            );

            const data = await response.json();

            if (data.is_successful) {
                setCategories(data.data);
            } else {
                console.log(data.message);
            }

        } catch (error) {
            console.log("Category API Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    if (loading) {
        return (
            <Typography
                align="center"
                sx={{ mt: 10 }}
            >
                Loading Categories...
            </Typography>
        );
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                padding: 5,
                backgroundColor: "#fff5f7"
            }}
        >

            <Typography
                variant="h3"
                align="center"
                sx={{
                    fontWeight: "bold",
                    mb: 1
                }}
            >
                Beauty Categories
            </Typography>

            <Typography
                align="center"
                sx={{
                    color: "gray",
                    mb: 5
                }}
            >
                Explore our beauty categories
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(2, 1fr)",
                        md: "repeat(3, 1fr)"
                    },
                    gap: 3
                }}
            >

                {categories.slice(0, 3).map((category) => (

                    <Card
                        key={category._id}
                        sx={{
                            textAlign: "center",
                            padding: 3,
                            borderRadius: 3,
                            cursor: "pointer",

                            transition: "all 0.3s ease",

                            "&:hover": {
                                transform: "translateY(-10px) scale(1.03)",
                                boxShadow: 8
                            }
                        }}
                    >

                        <CardContent>

                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: "bold",
                                    mb: 1
                                }}
                            >
                                {category.name}
                            </Typography>

                            <Typography
                                sx={{
                                    color: "gray"
                                }}
                            >
                                {category.description}
                            </Typography>

                        </CardContent>

                    </Card>

                ))}

            </Box>

        </Box>
    );
}

export default Categories;