import "./navbar.css";

// const Navbar = () => {
//   return (
//     <div className="navbar">
//       <div className="navContainer">
//         <span className="logo"></span>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="CLOUD9" sx={{ bgcolor: "#0F0F0F" }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div">
            LOGO
          </Typography>
        </Box>
        <Button color="inherit">Login</Button>
        <Button color="inherit">Register</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
