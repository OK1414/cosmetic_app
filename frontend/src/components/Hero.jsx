import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import heroImage from "../assets/hero.png";

function Hero() {
    return (
        <Box
            sx={{
                minHeight: "600px",

                backgroundImage: `url(${heroImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",

                display: "flex",
                alignItems: "center",

                position: "relative"
            }}
        >

            {/* Dark Overlay */}
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,

                    backgroundColor: "rgba(0, 0, 0, 0.25)"
                }}
            />

            {/* Hero Content */}
            <Box
                sx={{
                    position: "relative",
                    zIndex: 1,

                    ml: { xs: 3, md: 10 },

                    maxWidth: "550px",

                    color: "white"
                }}
            >

                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: "bold",
                        mb: 2
                    }}
                >
                    Discover Your Beauty
                </Typography>

                <Typography
                    variant="h6"
                    sx={{
                        mb: 4
                    }}
                >
                    Discover beauty products that make
                    you feel confident and beautiful.
                </Typography>

                <Button
                    variant="contained"
                    size="large"
                    sx={{
                        mr: 2,
                        px: 4,
                        py: 1.5
                    }}
                >
                    Shop Now
                </Button>

                <Button
                    variant="outlined"
                    size="large"
                    sx={{
                        px: 4,
                        py: 1.5,

                        color: "white",
                        borderColor: "white"
                    }}
                >
                    Explore
                </Button>

            </Box>

        </Box>
    );
}

export default Hero;