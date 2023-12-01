import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import dayjs from "dayjs";
import "./searchBar.css";

const SearchBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [cityOptions, setCityOptions] = useState([]);

  useEffect(() => {
    const fetchCityOptions = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/flights", {
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
          const flights = await response.json();
          const uniqueCities = Array.from(
            new Set(
              flights
                .map((flight) => flight.Destination)
                .filter((city) => city !== "")
            )
          );
          setCityOptions(uniqueCities);
        } else {
          throw new Error("Response is not in JSON format");
        }
      } catch (error) {
        console.error("Error fetching city options:", error);
      }
    };

    fetchCityOptions();
  }, []);

  const handleDateChange = (newValue) => {
    setDate(newValue);
  };

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
          width="40%"
        >

          {/* To Dropdown */}
          <Select
            size="small"
            variant="outlined"
            value={to}
            onChange={handleToChange}
            displayEmpty
            className="search-bar-dropdown"
          >
            <MenuItem value="" disabled>
              Destination
            </MenuItem>
            {cityOptions.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </Select>

          {/* Search Button */}
          <Button variant="contained" size="small" className="search-bar-button">
            Search
          </Button>

          {/* Search All Button */}
          <Button
            variant="contained"
            size="small"
            className="search-bar-button"
            onClick={(event) => (window.location.href = "/flights")}
          >
            View All Flights
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default SearchBar;
