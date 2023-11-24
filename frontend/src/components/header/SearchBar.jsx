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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "./searchBar.css";

const SearchBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [dialogOpen, setDialogOpen] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [from, setFrom] = useState(""); // State for 'From' text field
  const [to, setTo] = useState(""); // State for 'To' text field
  const [date, setDate] = useState(dayjs());

  const handleDateChange = (newValue) => {
    setDate(newValue);
  };

  const handleOpenDialog = useCallback(() => setDialogOpen(true), []);
  const handleCloseDialog = useCallback(() => setDialogOpen(false), []);

  // Handlers for text fields
  const handleFromChange = (event) => {
    setFrom(event.target.value);
  };

  const handleToChange = (event) => {
    setTo(event.target.value);
  };

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
          margin="16px"
        >
          <TextField
            size="small"
            variant="outlined"
            label="From"
            className="search-bar-textfield"
            value={from}
            onChange={handleFromChange}
          />

          <TextField
            size="small"
            variant="outlined"
            label="To"
            className="search-bar-textfield"
            value={to}
            onChange={handleToChange}
          />

          {/* Date Calendar */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Travel Date"
              value={date}
              onChange={handleDateChange}
              minDate={dayjs()}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  variant="outlined"
                  className="search-bar-textfield"
                  sx={{
                    "& .MuiInputBase-input": {
                      boxSizing: "border-box", // Ensure box-sizing is border-box
                      // Adjust the padding as needed to match the other text fields
                    },
                    // You may also want to set the height explicitly if needed
                    "& .MuiOutlinedInput-root": {
                      height: "40px", // Or whatever the height of your other inputs is
                      boxSizing: "border-box", // Ensure box-sizing is border-box
                    },
                  }}
                />
              )}
            />
          </LocalizationProvider>

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
