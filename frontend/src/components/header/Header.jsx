import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { faStar, faBan } from "@fortawesome/free-solid-svg-icons";
import FlightIconButton from "./FlightIconButton";
import HeaderTitle from "./HeaderTitle";
import SearchBar from "./SearchBar";
import "./header.css";

const ITEM_REWARDS = "Rewards";
const ITEM_CANCEL = "Cancel Flight";

/**
 * Header component for the application.
 * It includes navigation items, a title section, and a search bar.
 */
const Header = () => {
  const [activeItem, setActiveItem] = React.useState(ITEM_REWARDS);
  const navigate = useNavigate();

  const menuItems = [
    { icon: faStar, label: ITEM_REWARDS },
    { icon: faBan, label: ITEM_CANCEL },
  ];

  // Callback for setting the active menu item.
  const handleItemClick = useCallback((label) => {
    setActiveItem(label);
    if (label === ITEM_CANCEL) {
      navigate("/cancel");
    }
  }, [navigate]);

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
