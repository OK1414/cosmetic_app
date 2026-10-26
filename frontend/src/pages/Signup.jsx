import { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Signup({ goToHome, goToLogin }) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signup = async () => {

        if (name === "" || email === "" || password === "") {
            alert("Fill all the fields");
            return;
        }

        try {

            const response = await fetch("http://localhost:3000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });

            const data = await response.json();

            if (data.user) {
                alert("Account created successfully");
                goToLogin();
            } else {
                alert(data.message || "Failed to create account");
            }

        } catch (error) {
            console.log(error);
        }

    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                px: 2,
                backgroundColor: "#fff5f7"
            }}
        >

            <Paper
                elevation={4}
                sx={{
                    width: "100%",
                    maxWidth: 420,
                    padding: { xs: 3, sm: 4 },
                    borderRadius: 3
                }}
            >
                <Typography
                    variant="h4"
                    align="center"
                    sx={{ mb: 3, fontWeight: "bold" }}
                >
                    Sign Up
                </Typography>
            
                <TextField
                    fullWidth
                    label="Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ mb: 2 }}
                />

                <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ mb: 2 }}
                />

                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ mb: 3 }}
                />

                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={signup}
                    sx={{ mb: 2, py: 1.3, borderRadius: 2 }}
                >
                    Sign Up
                </Button>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 1,
                        mt: 2
                    }}
                >
                    <Button size="small" onClick={goToLogin} sx={{ textTransform: "none" }}>
                        Already have an account? Login
                    </Button>

                    <Button size="small" color="secondary" onClick={goToHome}>
                        Back to Home
                    </Button>
                </Box>

            </Paper>

        </Box>
    );
}

export default Signup;
