import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import dayjs from "dayjs";
import "./searchBar.css";

const SearchBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [from, setFrom] = useState(""); // State for 'From' text field
  const [to, setTo] = useState(""); // State for 'To' text field
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));

  const handleDateChange = (newValue) => {
    setDate(newValue);
  };

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
          width="60%"
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
          <TextField
            label="Travel Date"
            type="date"
            value={date} // Ensure this is in 'YYYY-MM-DD' format
            onChange={(event) => handleDateChange(event.target.value)} // Update the event handling
            size="small"
            variant="outlined"
            className="search-bar-textfield"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              inputProps: {
                min: dayjs().format("YYYY-MM-DD"),
              },
            }}
            sx={{
              minWidth: "20%",
              boxSizing: "border-box",
            }}
          />

          {/* Search Button */}
          <Button
            variant="contained"
            size="small"
            className="search-bar-button"
          >
            Search
          </Button>

          {/* Search All Button */}
          <Button
            variant="contained"
            size="small"
            className="search-bar-button"
            onClick={event =>  window.location.href='/flights'}
          >
            View All Flights
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default SearchBar;
