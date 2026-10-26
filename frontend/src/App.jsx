import { useEffect, useState } from "react"; 
 
import Home from "./pages/Home"; 
import Login from "./pages/Login"; 
import Signup from "./pages/Signup"; 
import Navbar from "./components/Navbar"; 
import Categories from "./pages/categories"; 
import AdminCategories from "./admin/AdminCategories"; 
import AdminDashboard from "./admin/AdminDashboard"; 
import Product from "./pages/Product"; 
import AdminProduct from "./admin/AdminProduct"; 
import Cart from "./pages/Cart"; 
import Orders from "./pages/Order"; 
import AdminUsers from "./admin/AdminUsers";
import AdminOrders from "./admin/AdminOrders";
 
function App() { 
    const [page, setPage] = useState("Home"); 
    const [cartCount, setCartCount] = useState(0);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (page !== "Product") {
            setPage("Product");
        }
    };

    const handleGoToProducts = () => {
        setSelectedCategoryId(null);
        setSearchQuery("");
        setPage("Product");
    };

    const handleSelectCategory = (categoryId) => {
        setSelectedCategoryId(categoryId);
        setSearchQuery("");
        setPage("Product");
    };

    const refreshCartCount = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                setCartCount(0);
                return;
            }

            const response = await fetch(
                "http://13.203.77.175:3000/getCart",
                {
                    headers: {
                        Authorization: token
                    }
                }
            );

            const data = await response.json();

            if (data.is_successful) {
                const items = (data.data?.items || []).filter(item => item && item.product);

                const count = items.reduce(
                    (total, item) => total + item.quantity,
                    0
                );

                setCartCount(count);
            }

        } catch (error) {
            console.log("Cart Count Error:", error);
        }
    };

    useEffect(() => {
        refreshCartCount();
    }, [page]);

    // Common Navbar Component Props
    const commonNavbar = (
        <Navbar 
            goToHome={() => setPage("Home")}
            goToLogin={() => setPage("Login")} 
            goToSignup={() => setPage("Signup")} 
            goToCategories={() => setPage("categories")} 
            goToProducts={handleGoToProducts} 
            goToCart={() => setPage("Cart")} 
            goToOrders={() => setPage("Orders")}
            goToAdminDashboard={() => setPage("AdminDashboard")}
            cartCount={cartCount}
            searchQuery={searchQuery}
            onSearch={handleSearch}
        />
    );
      
    if (page === "Signup") { 
        return ( 
            <Signup 
                goToLogin={() => setPage("Login")} 
                goToHome={() => setPage("Home")} 
            /> 
        ); 
    }  

    if (page === "Login") {  
        return ( 
            <Login 
                goToHome={() => setPage("Home")} 
                goToSignup={() => setPage("Signup")} 
                goToAdminDashboard={() => setPage("AdminDashboard")} 
            />
        ); 
    } 
 
    if (page === "Cart") { 
        return ( 
            <> 
                {commonNavbar}
                <Cart 
                    goToProducts={handleGoToProducts} 
                    goToOrders={() => setPage("Orders")} 
                    refreshCartCount={refreshCartCount}
                /> 
            </> 
        ); 
    } 
 
    if (page === "Orders") { 
        return ( 
            <> 
                {commonNavbar}
                <Orders 
                    goToProducts={handleGoToProducts} 
                    refreshCartCount={refreshCartCount}
                /> 
            </> 
        ); 
    } 
 
    if (page === "categories") { 
        return ( 
            <> 
                {commonNavbar}
                <Categories onSelectCategory={handleSelectCategory} />
            </> 
        ); 
    }

    if (page === "AdminCategories") { 
        return <AdminCategories goToAdminDashboard={() => setPage("AdminDashboard")} />; 
    } 
 
    if (page === "AdminDashboard") { 
        return ( 
            <AdminDashboard 
                goToCategories={() => setPage("AdminCategories")} 
                goToProducts={() => setPage("AdminProduct")} 
                goToHome={() => setPage("Home")} 
                goToUsers={() => setPage("AdminUsers")}
                goToOrders={() => setPage("AdminOrders")}
            /> 
        ); 
    }
    
    if (page === "AdminUsers") {
        return <AdminUsers goToAdminDashboard={() => setPage("AdminDashboard")} />;
    }

    if (page === "AdminOrders") {
        return <AdminOrders goToAdminDashboard={() => setPage("AdminDashboard")} />;
    }

    if (page === "Product") { 
        return ( 
            <> 
                {commonNavbar}
                <Product 
                    refreshCartCount={refreshCartCount} 
                    selectedCategoryId={selectedCategoryId}
                    onClearCategory={() => setSelectedCategoryId(null)}
                    goToCategories={() => setPage("categories")}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onClearSearch={() => setSearchQuery("")}
                /> 
            </> 
        ); 
    }
 
    if (page === "AdminProduct") { 
        return <AdminProduct goToAdminDashboard={() => setPage("AdminDashboard")} />; 
    } 

    return ( 
        <> 
            {commonNavbar}
            <Home 
                goToProducts={handleGoToProducts}
                goToCategories={() => setPage("categories")}
            /> 
        </> 
    ); 
} 

export default App;
