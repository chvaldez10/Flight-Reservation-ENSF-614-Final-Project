import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { faBook, faAddressCard } from "@fortawesome/free-solid-svg-icons";
import FlightIconButton from "./FlightIconButton"; // Import the new component
import "./header.css";

const Header = () => {
  const [activeItem, setActiveItem] = React.useState("book");

  return (
    <AppBar position="static" sx={{ backgroundColor: "#0f0f0f" }}>
      <Toolbar variant="dense">
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          {/* Book IconButton */}
          <FlightIconButton
            icon={faBook}
            label="Book"
            isActive={activeItem === "book"}
            onClick={() => setActiveItem("book")}
          />

          {/* Contact IconButton */}
          <FlightIconButton
            icon={faAddressCard}
            label="Contact"
            isActive={activeItem === "contact"}
            onClick={() => setActiveItem("contact")}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
