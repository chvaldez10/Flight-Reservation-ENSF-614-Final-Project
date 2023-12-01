import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../../context/AuthContext";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const authContext = useAuth();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogout = () => {
    authContext.logout();
    navigate("/");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#0F0F0F" }}>
      <Toolbar>
      <Box sx={{ flexGrow: 1 }}>
          <Button color="inherit" onClick={handleLogoClick} sx={{ display: "block", color: "#FFFFFF" }}>
            <Typography variant="h6" component="div">
              MILE HIGH
            </Typography>
          </Button>
        </Box>
        {authContext.isAuthenticated ? (
          <>
            <Typography variant="h6" component="div" sx={{ marginRight: 2 }}>
              {authContext.username}{" "}
              {/* Assuming username is part of your auth context */}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={handleLogin}>
              Login
            </Button>
            /
            <Button color="inherit" onClick={handleRegister}>
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
