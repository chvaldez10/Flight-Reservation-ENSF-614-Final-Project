import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../../context/AuthContext";

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

const Header = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); 

  const menuItems = [
    { icon: faBan, label: ITEM_CANCEL },
    ...(isAuthenticated ? [{ icon: faStar, label: ITEM_REWARDS }] : []),
  ];

  const handleItemClick = useCallback((label) => {
    setActiveItem(label);
    if (label === ITEM_CANCEL) {
      navigate("/cancel");
    } else if (label === ITEM_REWARDS) {
      navigate("/rewards");
    }
  }, [navigate]);

  const handleItemHover = useCallback((label) => {
    setHoveredItem(label);
  }, []);

  const handleItemLeave = useCallback(() => {
    setHoveredItem(null);
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
              isHovered={hoveredItem === item.label}
              onClick={() => handleItemClick(item.label)}
              onMouseEnter={() => handleItemHover(item.label)}
              onMouseLeave={handleItemLeave}
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
