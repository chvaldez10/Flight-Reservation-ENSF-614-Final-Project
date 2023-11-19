// Importing React and necessary Material-UI components
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

// Importing FontAwesome icon and icon component
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Importing stylesheet for header
import "./header.css";

const Header = () => {
  // State for managing the active item
  const [activeItem, setActiveItem] = React.useState("FlightItem 1");

  // Style for the icons, dynamically adjusting based on active state
  const iconStyle = (isActive) => ({
    marginRight: "8px", // Space between icon and text
    fontSize: "1.25rem", // Icon size
    color: isActive ? "white" : "gray", // Color based on active state
  });

  // Style for the text, dynamically adjusting based on active state
  const textStyle = (isActive) => ({
    fontSize: "1rem", // Text size
    color: isActive ? "white" : "gray", // Color based on active state
  });

  return (
    // AppBar component for the header with static positioning
    <AppBar position="static" sx={{ backgroundColor: "#0f0f0f" }}>
      <Toolbar variant="dense">
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          {/* Mapping through items to create IconButton components */}
          {[1, 2, 3].map((item) => {
            const itemName = `FlightItem ${item}`;
            const isActive = activeItem === itemName;

            // IconButton for each item with FontAwesome icon and text
            return (
              <IconButton
                key={itemName}
                onClick={() => setActiveItem(itemName)}
                sx={{
                  padding: "10px",
                  color: isActive ? "white" : "gray",
                }}
              >
                <FontAwesomeIcon icon={faPlane} style={iconStyle(isActive)} />
                <span style={textStyle(isActive)}>{itemName}</span>
              </IconButton>
            );
          })}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
