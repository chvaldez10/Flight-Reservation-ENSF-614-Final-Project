import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import "./searchBar.css";

const SearchBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
            label="Where are you going?"
            className="search-bar-textfield"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            size="small"
            variant="outlined"
            label="Check-in Date"
            type="date"
            style={{ margin: "8px", flexBasis: isMobile ? "auto" : "25%" }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            size="small"
            variant="outlined"
            label="Check-out Date"
            type="date"
            style={{ margin: "8px", flexBasis: isMobile ? "auto" : "25%" }}
            InputLabelProps={{ shrink: true }}
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
