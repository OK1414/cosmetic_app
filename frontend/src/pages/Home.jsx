import Box from "@mui/material/Box";
import Hero from "../components/Hero";

function Home({ goToProducts, goToCategories }) {
    return (
        <Box sx={{ pt: "0px" }}>
            <Hero goToProducts={goToProducts} goToCategories={goToCategories} />
        </Box>
    );
}

export default Home;
