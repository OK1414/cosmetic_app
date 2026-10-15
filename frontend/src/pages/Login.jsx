import { useState } from "react";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

function Login({ goToHome, goToSignup, goToAdminDashboard }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {

        if (email === "" || password === "") {
            alert("Fill the Fields");
            return;
        }

        try {

            const res = await fetch(
                "http://localhost:3000/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );

            const data = await res.json();

            if (data.is_successful) {

                localStorage.setItem("token", data.token);

                //read JWT payload

                const payload = JSON.parse(
                    atob(data.token.split(".")[1])
                );

                //store users info
                localStorage.setItem("user", JSON.stringify(payload));

                alert("Login Successful");

                if(payload.role === "admin"){
                    goToAdminDashboard();
                }else{
                     goToHome();
                }
            }
            else {
                alert(data.message);
            }

        }
        catch (error) {
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
                    Login
                </Typography>


                {/* Email */}

                <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ mb: 2 }}
                />


                {/* Password */}

                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ mb: 2 }}
                />


                {/* Login Button */}

                <Button
                    fullWidth
                    variant="contained"
                    onClick={login}
                    sx={{ mb: 2 }}
                >
                    Login
                </Button>


                {/* Navigation Buttons */}

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

                    <Button onClick={goToSignup}>
                        Create Account
                    </Button>

                </Box>

            </Paper>

        </Box>
    );
}

export default Login;