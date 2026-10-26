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
               localStorage.setItem("user", JSON.stringify({ ...payload, name: data.user.name }));

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
                    sx={{ mb: 3 }}
                />


                {/* Login Button */}

                <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={login}
                    sx={{
                        mb: 2,
                        py: 1.3,
                        borderRadius: 2
                    }}
                >
                    Login
                </Button>


                {/* Switch to Signup */}

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >

                    <Typography variant="body2">
                        Don't have an account?
                    </Typography>

                    <Button
                        size="small"
                        onClick={goToSignup}
                        sx={{ ml: 1, textTransform: "none" }}
                    >
                        Sign Up
                    </Button>

                </Box>


                {/* Home Button */}

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: 2
                    }}
                >

                    <Button
                        size="small"
                        color="secondary"
                        onClick={goToHome}
                    >
                        Back to Home
                    </Button>

                </Box>

            </Paper>

        </Box>
    );
}

export default Login;
