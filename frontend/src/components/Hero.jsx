import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import heroImage from "../assets/hero.png";

function Hero({ goToProducts, goToCategories }) {
    return (
        <Box
            sx={{
                minHeight: { xs: "500px", sm: "560px", md: "600px" },
                backgroundImage: `url(${heroImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                display: "flex",
                alignItems: "center",
                position: "relative",
                px: { xs: 2.5, sm: 5, md: 10 },
                py: { xs: 4, md: 6 },
                overflow: "hidden"
            }}
        >
            {/* Dark Overlay for text contrast */}
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.45)"
                }}
            />

            {/* Hero Content */}
            <Box
                sx={{
                    position: "relative",
                    zIndex: 1,
                    maxWidth: "580px",
                    width: "100%",
                    color: "white",
                    textAlign: { xs: "center", sm: "left" }
                }}
            >
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: "bold",
                        mb: 2,
                        fontSize: { xs: "2rem", sm: "2.8rem", md: "3.5rem" },
                        lineHeight: 1.2
                    }}
                >
                    Discover Your Beauty
                </Typography>

                <Typography
                    variant="h6"
                    sx={{
                        mb: 4,
                        fontSize: { xs: "0.95rem", sm: "1.1rem", md: "1.2rem" },
                        opacity: 0.9,
                        mx: { xs: "auto", sm: 0 },
                        maxWidth: { xs: "400px", sm: "100%" }
                    }}
                >
                    Discover beauty products that make you feel confident and beautiful.
                </Typography>

                {/* Simple Action Buttons */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        justifyContent: { xs: "center", sm: "flex-start" },
                        alignItems: "center",
                        gap: 2,
                        width: "100%"
                    }}
                >
                    <Button
                        variant="contained"
                        size="large"
                        onClick={goToProducts}
                        sx={{
                            px: 4,
                            py: 1.3,
                            borderRadius: 2,
                            fontWeight: "bold",
                            fontSize: "1rem",
                            textTransform: "none",
                            width: { xs: "100%", sm: "auto" },
                            maxWidth: { xs: "280px", sm: "none" }
                        }}
                    >
                        Shop Now
                    </Button>

                    <Button
                        variant="outlined"
                        size="large"
                        onClick={goToCategories}
                        sx={{
                            px: 4,
                            py: 1.3,
                            borderRadius: 2,
                            fontWeight: "bold",
                            fontSize: "1rem",
                            textTransform: "none",
                            color: "white",
                            borderColor: "white",
                            "&:hover": {
                                borderColor: "white",
                                backgroundColor: "rgba(255, 255, 255, 0.15)"
                            },
                            width: { xs: "100%", sm: "auto" },
                            maxWidth: { xs: "280px", sm: "none" }
                        }}
                    >
                        Explore
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default Hero;
