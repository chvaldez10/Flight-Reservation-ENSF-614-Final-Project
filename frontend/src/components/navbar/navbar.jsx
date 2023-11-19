// Importing necessary CSS and React
import "./navbar.css";
import React from "react";

// Importing Material-UI components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

// Navbar component that displays the navigation bar
const Navbar = () => {
  return (
    // AppBar with sticky positioning and custom background color
    <AppBar position="sticky" sx={{ bgcolor: "#0F0F0F" }}>
      <Toolbar>
        {/* Box used for layout, allowing the title to grow */}
        <Box sx={{ flexGrow: 1 }}>
          {/* Typography for the title of the navbar */}
          <Typography variant="h6" component="div">
            MILE HIGH
          </Typography>
        </Box>
        {/* Buttons for login and registration functionality */}
        <Button color="inherit">Login</Button>
        <Button color="inherit">Register</Button>
      </Toolbar>
    </AppBar>
  );
};

// Exporting Navbar for use in other parts of the application
export default Navbar;
