import { useState } from "react";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

function Signup({ goToLogin, goToHome }) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signup = async () => {

        if (name === "" || email === "" || password === "") {
            alert("Please fill all fields");
            return;
        }

        try {

            const res = await fetch(
                "http://localhost:3000/signup",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name: name,
                        email: email,
                        password: password
                    })
                }
            );

            const data = await res.json();

            if (!res.ok) {
                alert(data.message);
                return;
            }

            alert("Registration Successful");

            goToLogin();

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
                alignItems: "center"
            }}
        >

            <Paper
                elevation={4}
                sx={{
                    width: 400,
                    padding: 4,
                    borderRadius: 3
                }}
            >
                <Typography
                    variant="h4"
                    align="center"
                    sx={{ mb: 3 }}
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
                    sx={{ mb: 2 }}
                />
                <Button
                    fullWidth
                    variant="contained"
                    onClick={signup}
                    sx={{ mb: 2 }}
                >
                    Sign Up
                </Button>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 1,
                        mt: 2
                    }}
                >

                    <Button onClick={goToHome}>
                        Back to Home
                    </Button>

                    <Button onClick={goToLogin}>
                        Already have an account? Login
                    </Button>

                </Box>

            </Paper>

        </Box>
    );
}

export default Signup;