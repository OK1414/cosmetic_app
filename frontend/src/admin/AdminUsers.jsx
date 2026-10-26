import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function AdminUsers({ goToAdminDashboard }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const getUsers = async () => {
        try {
            const response = await fetch("http://13.203.77.175:3000/getUsers");
            const data = await response.json();
            if (data.is_successful) {
                setUsers(data.data || []);
            }
        } catch (error) {
            console.log("Get Users Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <Box sx={{ minHeight: "100vh", backgroundColor: "#fff5f7", p: { xs: 2, sm: 3, md: 5 } }}>
            {/* Back Button */}
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

            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3, fontSize: { xs: "1.7rem", sm: "2.1rem" } }}>
                Registered Users ({users.length})
            </Typography>

            <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3, overflowX: "auto" }}>
                <Table sx={{ minWidth: 500 }}>
                    <TableHead sx={{ backgroundColor: "#1976d2" }}>
                        <TableRow>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>#</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Role</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>Loading users...</TableCell>
                            </TableRow>
                        ) : users.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>No users found</TableCell>
                            </TableRow>
                        ) : (
                            users.map((user, index) => (
                                <TableRow key={user._id} hover>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Chip label={user.role} color="primary" size="small" />
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={user.isLoggedIn ? "Active" : "Offline"}
                                            color={user.isLoggedIn ? "success" : "default"}
                                            size="small"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default AdminUsers;
