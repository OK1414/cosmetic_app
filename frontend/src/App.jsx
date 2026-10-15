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
 
 
 
function App() { 
    const [page, setPage] = useState("Home"); 

    // ADDED FOR CART
    const [cartCount, setCartCount] = useState(0);

    // ADDED FOR CART
    const refreshCartCount = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                setCartCount(0);
                return;
            }

            const response = await fetch(
                "http://localhost:3000/getCart",
                {
                    headers: {
                        Authorization: token
                    }
                }
            );

            const data = await response.json();

            if (data.is_successful) {
                const items = data.data?.items || [];

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

    // ADDED FOR CART
    useEffect(() => {
        refreshCartCount();
    }, []);
      
 if(page === "Signup"){ 
        return ( 
        <Signup 
                goToLogin={() => setPage("Login")} 
                goToHome={() => setPage("Home")} 
            /> 
        ); 
    }  

if(page === "Login"){  
return ( <Login 
                goToHome={() => setPage("Home")} 
                goToSignup={() => setPage("Signup")} 
                goToAdminDashboard={() => setPage("AdminDashboard")} 
            />) ; 
} 
 
if (page === "Cart") { 
    return ( 
        <> 
            <Navbar 
                goToHome={() => setPage("Home")}
                goToLogin={() => setPage("Login")} 
                goToSignup={() => setPage("Signup")} 
                goToCategories={() => setPage("categories")} 
                goToProducts={() => setPage("Product")} 
                goToCart={() => setPage("Cart")} 

                // ADDED
                cartCount={cartCount}
            /> 
 
            <Cart 
                goToProducts={() => setPage("Product")} 
                goToOrders={() => setPage("Orders")} 

                // ADDED
                refreshCartCount={refreshCartCount}
            /> 
        </> 
    ); 
} 
 
if (page === "Orders") { 
    return ( 
        <> 
            <Navbar 
            goToHome={() => setPage("Home")}
                goToLogin={() => setPage("Login")} 
                goToSignup={() => setPage("Signup")} 
                goToCategories={() => setPage("categories")} 
                goToProducts={() => setPage("Product")} 
                goToCart={() => setPage("Cart")} 

                // ADDED
                cartCount={cartCount}
            /> 
 
            <Orders 
                goToProducts={() => setPage("Product")} 
            /> 
        </> 
    ); 
} 
 
 
if (page === "categories") { 
 return ( 
    <> 
        <Navbar 
            goToHome={() => setPage("Home")}
            goToLogin={() => setPage("Login")} 
            goToSignup={() => setPage("Signup")} 
            goToCategories={() => setPage("categories")} 
            goToProducts={() => setPage("Product")} 
        /> 
        <Categories /> 
    </> 
    ); 
} 

if (page === "AdminCategories") { 
    return <AdminCategories />; 
} 
 
if (page === "AdminDashboard") { 
    return ( 
        <AdminDashboard 
            goToCategories={() => setPage("AdminCategories")} 
            goToProducts={() => setPage("AdminProduct")} 
        /> 
    ); 
} 

if (page === "Product") { 
    return ( 
        <> 
            <Navbar 
                goToHome={()=> setPage("Home")}
                goToLogin={() => setPage("Login")} 
                goToSignup={() => setPage("Signup")} 
                goToCategories={() => setPage("categories")} 
                goToProducts={() => setPage("Product")} 
                goToCart={() => setPage("Cart")} 

                // ADDED
                cartCount={cartCount}
            /> 
 
            <Product 
                // ADDED
                refreshCartCount={refreshCartCount}
            /> 
        </> 
    ); 
} 
 
if (page === "AdminProduct") { 
    return <AdminProduct />; 
} 

 return ( 
        <> 
            <Navbar 
            goToHome={() => setPage("Home")}
                goToLogin={() => setPage("Login")} 
                goToSignup={() => setPage("Signup")} 
                goToCategories={() => setPage("categories")} 
                goToProducts={() => setPage("Product")} 
                goToCart={() => setPage("Cart")} 

                // ADDED
                cartCount={cartCount}
            /> 
 
            <Home /> 
        </> 
    ); 
 
} 

export default App