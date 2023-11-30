import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../../context/AuthContext";
import {
  Box,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [selectedRole, setSelectedRole] = useState("admin");
  const navigate = useNavigate();
  const authContext = useAuth();

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const loginSuccess = await authContext.login(
      username,
      password,
      selectedRole
    );

    if (loginSuccess) {
      // Redirect based on the user's role
      if (selectedRole === "admin") {
        navigate("/admin/dashboard");
      } else if (selectedRole === "agent") {
        navigate("/agent/dashboard");
      } else {
        navigate("/");
      }
    } else {
      setShowErrorMessage(true);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "background.default",
      }}
    >
      <Paper
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "300px",
          width: "100%",
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel>Role</InputLabel>
            <Select
              value={selectedRole}
              onChange={handleRoleChange}
              label="Role"
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="agent">Agent</MenuItem>
              <MenuItem value="user">User</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Username"
            type="text"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          {showErrorMessage && (
            <Typography sx={{ color: "red", mb: 2 }}>
              Authentication Failed. Please check your credentials.
            </Typography>
          )}
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: "black",
                  color: "white",
                  "&:hover": { bgcolor: "black", opacity: 0.8 },
                  mb: 1,
                }}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                component={RouterLink}
                to="/register"
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: "white",
                  color: "black",
                  "&:hover": { bgcolor: "white", opacity: 0.8 },
                }}
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
