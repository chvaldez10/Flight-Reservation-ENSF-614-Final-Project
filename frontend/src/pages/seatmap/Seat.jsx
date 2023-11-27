import React from "react";
import { Button } from "@mui/material";
import FlightIcon from "@mui/icons-material/Flight";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";

const Seat = ({ seatNumber, seatClass, onSelect }) => {
  const seatStyle = {
    base: {
      margin: "5px",
      minWidth: "50px", // Fixed width for all seats
      minHeight: "50px", // Fixed height for all seats
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "0.75rem", // Adjusted font size to fit in the button
      lineHeight: "normal", // Ensuring the text is centered vertically
    },
    business: {
      backgroundColor: "black",
      color: "gold",
    },
    comfort: {
      backgroundColor: "silver",
      color: "black",
    },
    economy: {
      backgroundColor: "lightgray",
      color: "black",
    },
  };

  const iconSize = {
    fontSize: "1.25rem", // Adjust icon size to fit the button
  };

  // Assign a default icon for economy class
  const defaultIcon = (
    <AirlineSeatReclineNormalIcon style={iconSize} opacity={0} />
  ); // Invisible icon for spacing

  // Choose the appropriate icon based on the seat class
  const icon =
    seatClass === "business" ? (
      <FlightIcon style={iconSize} />
    ) : seatClass === "comfort" ? (
      <AirlineSeatReclineNormalIcon style={iconSize} />
    ) : (
      defaultIcon
    ); // Use the default icon for economy class for consistent sizing

  return (
    <Button
      variant="contained"
      style={{ ...seatStyle.base, ...seatStyle[seatClass] }}
      onClick={() => onSelect(seatNumber)}
      startIcon={icon}
    >
      {seatNumber}
    </Button>
  );
};

export default Seat;
