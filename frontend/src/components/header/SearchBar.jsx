import React, { useState, useCallback } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import SelectPassengers from "./SelectPassengers";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./searchBar.css";
import DateRangePickerComponent from "./DateRangePickerComponent";

const SearchBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [dialogOpen, setDialogOpen] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const handleDateChange = (startDate, endDate) => {
    // Handle the change in date range here
    console.log(startDate, endDate);
  };

  const handleOpenDialog = useCallback(() => setDialogOpen(true), []);
  const handleCloseDialog = useCallback(() => setDialogOpen(false), []);

  return (
    <AppBar position="static" color="default" className="search-bar-appbar">
      <Toolbar style={{ justifyContent: "center" }}>
        <Box
          display="flex"
          flexDirection={isMobile ? "column" : "row"}
          alignItems={isMobile ? "center" : "center"}
          justifyContent={isMobile ? "center" : "space-evenly"}
          gap={2}
          width="80%"
          paddingX={1}
          margin="auto"
        >
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

          {/* Date Range Picker */}
          <DateRangePickerComponent
            initialStartDate={new Date()}
            initialEndDate={new Date()}
            handleDateChange={handleDateChange}
          />

          {/* Passenger TextField */}
          <TextField
            size="small"
            variant="outlined"
            label={`${adults} adults · ${children} children`}
            onClick={handleOpenDialog}
            className="search-bar-textfield"
            InputProps={{
              readOnly: true,
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                  <ChildCareIcon />
                </InputAdornment>
              ),
            }}
          />

          {/* Dialog for selecting passengers*/}
          <SelectPassengers
            open={dialogOpen}
            onClose={handleCloseDialog}
            adults={adults}
            setAdults={setAdults}
            children={children}
            setChildren={setChildren}
          />

          {/* Search Button */}
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
