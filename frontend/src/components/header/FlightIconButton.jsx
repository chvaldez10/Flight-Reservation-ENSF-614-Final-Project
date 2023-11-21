import React from "react";
import IconButton from "@mui/material/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FlightIconButton = ({ icon, label, isActive, onClick }) => {
  const iconStyle = (isActive) => ({
    marginRight: "8px",
    fontSize: "1.25rem",
    color: isActive ? "white" : "gray",
  });

  const textStyle = (isActive) => ({
    fontSize: "1rem",
    color: isActive ? "white" : "gray",
  });

  return (
    <IconButton
      onClick={onClick}
      sx={{
        padding: "10px",
        color: isActive ? "white" : "gray",
      }}
    >
      <FontAwesomeIcon icon={icon} style={iconStyle(isActive)} />
      <span style={textStyle(isActive)}>{label}</span>
    </IconButton>
  );
};

export default FlightIconButton;
