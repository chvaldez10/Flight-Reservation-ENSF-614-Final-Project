import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { faBook, faAddressCard } from "@fortawesome/free-solid-svg-icons";
import FlightIconButton from "./FlightIconButton";
import HeaderTitle from "./HeaderTitle";
import SearchBar from "./SearchBar";
import "./header.css";

const ITEM_BOOK = "book";
const ITEM_CONTACT = "contact";

const Header = () => {
  const [activeItem, setActiveItem] = React.useState(ITEM_BOOK);

  const menuItems = [
    { icon: faBook, label: ITEM_BOOK },
    { icon: faAddressCard, label: ITEM_CONTACT },
  ];

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
              onClick={() => setActiveItem(item.label)}
            />
          ))}
        </Box>
      </Toolbar>

      <HeaderTitle
        title="Canada's Cheap Deals"
        subtitle="More options, our best prices, less headaches."
      />

      <SearchBar />
    </AppBar>
  );
};

export default Header;
