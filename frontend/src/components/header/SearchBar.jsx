import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import PersonIcon from "@mui/icons-material/Person";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import DateRangePicker from "react-date-range";
import { DateRange } from "react-date-range";
import "./searchBar.css";

const SearchBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // State for the date range
  const [date, setDate] = useState();

  return (
    <AppBar position="static" color="default" className="search-bar-appbar">
      <Toolbar>
        <Box
          display="flex"
          flexDirection={isMobile ? "column" : "row"}
          alignItems={isMobile ? "stretch" : "center"}
          width="100%"
        >
          {/* Where are you going search */}
          <TextField
            size="small"
            variant="outlined"
            label="From"
            className="search-bar-textfield"
          />

          <TextField
            size="small"
            variant="outlined"
            label="To"
            className="search-bar-textfield"
          />

          <TextField
            size="small"
            variant="outlined"
            label="2 adults · 0 children · 1 room"
            style={{ margin: "8px", flexBasis: isMobile ? "auto" : "25%" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                  <ChildCareIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            size="small"
            className="search-bar-button"
          >
            Search
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default SearchBar;
