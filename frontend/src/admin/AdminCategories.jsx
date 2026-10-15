import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


function AdminCategories() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [categories, setCategories] = useState([]);

    // Used to know whether we are editing
    const [editId, setEditId] = useState(null);


    // ==========================================
    // GET ALL CATEGORIES
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
                "Get Category Error:",
                error
            );

        }
    };


    // ==========================================
    // LOAD CATEGORIES
    // ==========================================

    useEffect(() => {

        getCategories();

    }, []);


    // ==========================================
    // ADD / UPDATE CATEGORY
    // ==========================================

    const saveCategory = async () => {

        // Check fields
        if (
            name.trim() === "" ||
            description.trim() === ""
        ) {

            alert("Please fill all fields");

            return;
        }


        try {

            // Get token
            const token = localStorage.getItem("token");


            if (!token) {

                alert("Please login as admin");

                return;
            }


            // ======================================
            // UPDATE CATEGORY
            // ======================================

            if (editId) {

                const response = await fetch(
                    `http://localhost:3000/updateCategory/${editId}`,
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type": "application/json",

                            Authorization: token
                        },

                        body: JSON.stringify({
                            name: name,
                            description: description
                        })
                    }
                );


                const data = await response.json();


                if (data.is_successful) {

                    alert(
                        "Category updated successfully"
                    );


                    // Clear form
                    setName("");
                    setDescription("");

                    // Exit edit mode
                    setEditId(null);

                    // Refresh categories
                    getCategories();

                } else {

                    alert(
                        data.message ||
                        "Failed to update category"
                    );
                }


                return;
            }


            // ======================================
            // ADD CATEGORY
            // ======================================

            const response = await fetch(
                "http://localhost:3000/category",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",

                        Authorization: token
                    },

                    body: JSON.stringify({
                        name: name,
                        description: description
                    })
                }
            );


            const data = await response.json();


            if (data.is_successful) {

                alert(
                    "Category added successfully"
                );


                // Clear form
                setName("");
                setDescription("");


                // Refresh list
                getCategories();

            } else {

                alert(
                    data.message ||
                    "Failed to add category"
                );

            }

        } catch (error) {

            console.log(
                "Save Category Error:",
                error
            );

            alert("Something went wrong");

        }
    };


    // ==========================================
    // START EDIT
    // ==========================================

    const editCategory = (category) => {

        setEditId(category._id);

        setName(category.name);

        setDescription(category.description);

        // Scroll to top so user sees form
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    // ==========================================
    // CANCEL EDIT
    // ==========================================

    const cancelEdit = () => {

        setEditId(null);

        setName("");

        setDescription("");
    };


    // ==========================================
    // DELETE CATEGORY
    // ==========================================

    const deleteCategory = async (id) => {

        const token = localStorage.getItem("token");


        if (!token) {

            alert("Please login as admin");

            return;
        }


        const confirmDelete = window.confirm(
            "Are you sure you want to delete this category?"
        );


        if (!confirmDelete) {

            return;
        }


        try {

            const response = await fetch(
                `http://localhost:3000/deleteCategory/${id}`,
                {
                    method: "DELETE",

                    headers: {
                        Authorization: token
                    }
                }
            );


            const data = await response.json();


            if (data.is_successful) {

                alert(
                    "Category deleted successfully"
                );

                getCategories();

            } else {

                alert(
                    data.message ||
                    "Failed to delete category"
                );

            }

        } catch (error) {

            console.log(
                "Delete Category Error:",
                error
            );

            alert("Something went wrong");

        }
    };


    // ==========================================
    // UI
    // ==========================================

    return (

        <Box
            sx={{
                minHeight: "100vh",

                backgroundColor: "#fff5f7",

                padding: 5
            }}
        >

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
                Manage Categories
            </Typography>



            {/* ==================================
                ADD / EDIT FORM
            ================================== */}

            <Paper
                sx={{
                    maxWidth: 600,

                    padding: 4,

                    borderRadius: 3,

                    mb: 5
                }}
            >

                <Typography
                    variant="h5"
                    sx={{
                        mb: 3,

                        fontWeight: "bold"
                    }}
                >
                    {editId
                        ? "Edit Category"
                        : "Add Category"}
                </Typography>



                {/* CATEGORY NAME */}

                <TextField
                    fullWidth

                    label="Category Name"

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
                        setDescription(e.target.value)
                    }

                    sx={{
                        mb: 3
                    }}
                />



                {/* SAVE BUTTON */}

                <Button
                    variant="contained"

                    onClick={saveCategory}

                    sx={{
                        mr: 2
                    }}
                >
                    {editId
                        ? "Update Category"
                        : "Add Category"}
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
                CATEGORY LIST
            ================================== */}

            <Typography
                variant="h5"
                sx={{
                    fontWeight: "bold",

                    mb: 3
                }}
            >
                All Categories
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

                {categories.map((category) => (

                    <Paper
                        key={category._id}

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

                        {/* CATEGORY NAME */}

                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: "bold",

                                mb: 1
                            }}
                        >
                            {category.name}
                        </Typography>



                        {/* DESCRIPTION */}

                        <Typography
                            sx={{
                                color: "gray",

                                mb: 2
                            }}
                        >
                            {category.description}
                        </Typography>



                        {/* EDIT BUTTON */}

                        <Button
                            variant="contained"

                            onClick={() =>
                                editCategory(category)
                            }

                            sx={{
                                mr: 1
                            }}
                        >
                            Edit
                        </Button>



                        {/* DELETE BUTTON */}

                        <Button
                            variant="outlined"

                            color="error"

                            onClick={() =>
                                deleteCategory(
                                    category._id
                                )
                            }
                        >
                            Delete
                        </Button>

                    </Paper>

                ))}

            </Box>

        </Box>
    );
}


export default AdminCategories;