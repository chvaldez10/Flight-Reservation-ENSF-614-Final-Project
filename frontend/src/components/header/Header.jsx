import React, { useCallback } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { faStar, faBan } from "@fortawesome/free-solid-svg-icons";
import FlightIconButton from "./FlightIconButton";
import HeaderTitle from "./HeaderTitle";
import SearchBar from "./SearchBar";
import "./header.css";

const ITEM_BOOK = "Rewards";
const ITEM_CONTACT = "Cancel Flight";

/**
 * Header component for the application.
 * It includes navigation items, a title section, and a search bar.
 */
const Header = () => {
  const [activeItem, setActiveItem] = React.useState(ITEM_BOOK);

  const menuItems = [
    { icon: faStar, label: ITEM_BOOK },
    { icon: faBan, label: ITEM_CONTACT },
  ];

  // Callback for setting the active menu item.
  const handleItemClick = useCallback((label) => {
    setActiveItem(label);
  }, []);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#0f0f0f" }}>
      <Toolbar variant="dense">
        <Box className="header-box">
          {menuItems.map((item) => (
            <FlightIconButton
              key={item.label}
              icon={item.icon}
              label={item.label}
              isActive={activeItem === item.label}
              onClick={() => handleItemClick(item.label)}
            />
          ))}
        </Box>
      </Toolbar>

      <HeaderTitle
        title="Canada's Cheapest Deals"
        subtitle="More options, our best prices, less headaches."
      />

      <SearchBar />
    </AppBar>
  );
};

export default Header;
