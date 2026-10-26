import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuItem from "@mui/material/MenuItem";


function AdminProduct({ goToAdminDashboard }) {

    // ==========================================
    // FORM STATES
    // ==========================================

    const [name, setName] = useState("");

    const [description, setDescription] = useState("");

    const [price, setPrice] = useState("");

    const [categoryId, setCategoryId] = useState("");


    // ==========================================
    // DATA STATES
    // ==========================================

    const [products, setProducts] = useState([]);

    const [categories, setCategories] = useState([]);


    // Edit ID
    const [editId, setEditId] = useState(null);


    // ==========================================
    // GET PRODUCTS
    // ==========================================

    const getProducts = async () => {

        try {

            const response = await fetch(
                "http://localhost:3000/getProduct"
            );

            const data = await response.json();


            if (data.is_successful) {

                setProducts(data.data);

            } else {

                console.log(data.message);

            }

        } catch (error) {

            console.log(
                "Get Products Error:",
                error
            );

        }
    };


    // ==========================================
    // GET CATEGORIES
    // ==========================================

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

            console.log(
                "Get Categories Error:",
                error
            );

        }
    };


    // ==========================================
    // LOAD DATA
    // ==========================================

    useEffect(() => {

        getProducts();

        getCategories();

    }, []);


    // ==========================================
    // CLEAR FORM
    // ==========================================

    const clearForm = () => {

        setName("");

        setDescription("");

        setPrice("");

        setCategoryId("");

        setEditId(null);
    };


    // ==========================================
    // ADD / UPDATE PRODUCT
    // ==========================================

    const saveProduct = async () => {

        // Check fields

        if (
            name.trim() === "" ||
            description.trim() === "" ||
            price === "" ||
            categoryId === ""
        ) {

            alert("Please fill all fields");

            return;
        }


        // Check token

        const token = localStorage.getItem("token");


        if (!token) {

            alert("Please login as admin");

            return;
        }


        try {

            // ======================================
            // UPDATE PRODUCT
            // ======================================

            if (editId) {

                const response = await fetch(

                    `http://localhost:3000/updateProduct/${editId}`,

                    {
                        method: "PUT",

                        headers: {

                            "Content-Type":
                                "application/json",

                            Authorization: token

                        },

                        body: JSON.stringify({

                            name: name,

                            description:
                                description,

                            price:
                                Number(price),

                            categoryId:
                                categoryId

                        })
                    }
                );


                const data =
                    await response.json();


                if (data.is_successful) {

                    alert(
                        "Product updated successfully"
                    );

                    clearForm();

                    getProducts();

                } else {

                    alert(
                        data.message ||
                        "Failed to update product"
                    );
                }


                return;
            }


            // ======================================
            // ADD PRODUCT
            // ======================================

            const response = await fetch(
                "http://localhost:3000/product",
                {
                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        Authorization: token

                    },

                    body: JSON.stringify({

                        name: name,

                        description:
                            description,

                        price:
                            Number(price),

                        categoryId:
                            categoryId

                    })
                }
            );


            const data =
                await response.json();


            if (data.is_successful) {

                alert(
                    "Product added successfully"
                );


                clearForm();


                getProducts();

            } else {

                alert(
                    data.message ||
                    "Failed to add product"
                );

            }

        } catch (error) {

            console.log(
                "Save Product Error:",
                error
            );

            alert("Something went wrong");

        }
    };


    // ==========================================
    // EDIT PRODUCT
    // ==========================================

    const editProduct = (product) => {

        setEditId(product._id);

        setName(product.name);

        setDescription(product.description);

        setPrice(product.price);


        // Because GET /getProduct uses populate()
        // category can be an object

        if (product.category?._id) {

            setCategoryId(
                product.category._id
            );

        } else {

            setCategoryId(
                product.category
            );

        }


        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });
    };


    // ==========================================
    // DELETE PRODUCT
    // ==========================================

    const deleteProduct = async (id) => {

        const token =
            localStorage.getItem("token");


        if (!token) {

            alert("Please login as admin");

            return;
        }


        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this product?"
            );


        if (!confirmDelete) {

            return;
        }


        try {

            const response = await fetch(

                `http://localhost:3000/deleteProduct/${id}`,

                {
                    method: "DELETE",

                    headers: {

                        Authorization: token

                    }
                }
            );


            const data =
                await response.json();


            if (data.is_successful) {

                alert(
                    "Product deleted successfully"
                );


                getProducts();

            } else {

                alert(
                    data.message ||
                    "Failed to delete product"
                );

            }

        } catch (error) {

            console.log(
                "Delete Product Error:",
                error
            );

            alert("Something went wrong");

        }
    };


    // ==========================================
    // CANCEL EDIT
    // ==========================================

    const cancelEdit = () => {

        clearForm();

    };


    // ==========================================
    // UI
    // ==========================================

    return (

        <Box
            sx={{
                minHeight: "100vh",

                backgroundColor: "#fff5f7",

                padding: {
                    xs: 2,
                    sm: 4,
                    md: 5
                }
            }}
        >

                        {/* BACK TO DASHBOARD BUTTON */}
            <Box sx={{ mb: 3 }}>
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={goToAdminDashboard}
                    sx={{ borderRadius: 2, textTransform: "none", fontWeight: "bold" }}
                >
                    Back to Dashboard
                </Button>
            </Box>

            {/* ==================================
                PAGE TITLE
            ================================== */}

            <Typography
                variant="h4"
                sx={{
                    fontWeight: "bold",

                    mb: 4
                }}
            >
                Manage Products
            </Typography>



            {/* ==================================
                ADD / EDIT FORM
            ================================== */}

            <Paper
                sx={{
                    maxWidth: 700,

                    padding: 4,

                    borderRadius: 3,

                    mb: 5
                }}
            >

                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: "bold",

                        mb: 3
                    }}
                >
                    {editId
                        ? "Edit Product"
                        : "Add Product"}
                </Typography>



                {/* PRODUCT NAME */}

                <TextField
                    fullWidth

                    label="Product Name"

                    value={name}

                    onChange={(e) =>
                        setName(e.target.value)
                    }

                    sx={{
                        mb: 3
                    }}
                />



                {/* DESCRIPTION */}

                <TextField
                    fullWidth

                    label="Description"

                    multiline

                    rows={4}

                    value={description}

                    onChange={(e) =>
                        setDescription(
                            e.target.value
                        )
                    }

                    sx={{
                        mb: 3
                    }}
                />



                {/* PRICE */}

                <TextField
                    fullWidth

                    label="Price"

                    type="number"

                    value={price}

                    onChange={(e) =>
                        setPrice(e.target.value)
                    }

                    sx={{
                        mb: 3
                    }}
                />



                {/* CATEGORY */}

                <TextField
                    fullWidth

                    select

                    label="Category"

                    value={categoryId}

                    onChange={(e) =>
                        setCategoryId(
                            e.target.value
                        )
                    }

                    sx={{
                        mb: 3
                    }}
                >

                    {categories.map(
                        (category) => (

                            <MenuItem
                                key={
                                    category._id
                                }
                                value={
                                    category._id
                                }
                            >
                                {category.name}
                            </MenuItem>

                        )
                    )}

                </TextField>



                {/* SAVE BUTTON */}

                <Button
                    variant="contained"

                    onClick={saveProduct}

                    sx={{
                        mr: 2
                    }}
                >
                    {editId
                        ? "Update Product"
                        : "Add Product"}
                </Button>



                {/* CANCEL BUTTON */}

                {editId && (

                    <Button
                        variant="outlined"

                        color="error"

                        onClick={cancelEdit}
                    >
                        Cancel
                    </Button>

                )}

            </Paper>



            {/* ==================================
                PRODUCT LIST
            ================================== */}

            <Typography
                variant="h5"
                sx={{
                    fontWeight: "bold",

                    mb: 3
                }}
            >
                All Products
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

                {products.map(
                    (product) => (

                        <Paper
                            key={
                                product._id
                            }

                            sx={{
                                padding: 3,

                                borderRadius: 3,

                                transition:
                                    "all 0.3s ease",

                                "&:hover": {

                                    transform:
                                        "translateY(-5px)",

                                    boxShadow: 5
                                }
                            }}
                        >

                            {/* NAME */}

                            <Typography
                                variant="h6"

                                sx={{
                                    fontWeight:
                                        "bold",

                                    mb: 1
                                }}
                            >
                                {product.name}
                            </Typography>



                            {/* DESCRIPTION */}

                            <Typography
                                sx={{
                                    color: "gray",

                                    mb: 1
                                }}
                            >
                                {
                                    product.description
                                }
                            </Typography>



                            {/* PRICE */}

                            <Typography
                                sx={{
                                    fontWeight:
                                        "bold",

                                    mb: 1
                                }}
                            >
                                ₹{product.price}
                            </Typography>



                            {/* CATEGORY */}

                            <Typography
                                sx={{
                                    color:
                                        "gray",

                                    mb: 2
                                }}
                            >
                                Category:{" "}

                                {product.category?.name
                                    ? product.category.name
                                    : product.category}
                            </Typography>



                            {/* EDIT */}

                            <Button
                                variant="contained"

                                onClick={() =>
                                    editProduct(
                                        product
                                    )
                                }

                                sx={{
                                    mr: 1
                                }}
                            >
                                Edit
                            </Button>



                            {/* DELETE */}

                            <Button
                                variant="outlined"

                                color="error"

                                onClick={() =>
                                    deleteProduct(
                                        product._id
                                    )
                                }
                            >
                                Delete
                            </Button>

                        </Paper>

                    )
                )}

            </Box>

        </Box>
    );
}


export default AdminProduct;