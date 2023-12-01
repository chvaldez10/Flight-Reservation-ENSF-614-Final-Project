import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const FlightDetails = ({ flightInfo }) => {
  const theme = useTheme();

  const styles = {
    container: {
      maxWidth: "500px",
      margin: "0 auto",
      color: theme.palette.mode === "dark" ? "white" : "black",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: theme.spacing(2),
    },
    icon: {
      verticalAlign: "middle",
      marginRight: theme.spacing(1),
    },
  };

  return (
    <Box sx={styles.container}>
      <Typography variant="h6">
        <FlightTakeoffIcon sx={styles.icon} />
        Your trip from {flightInfo.origin} to {flightInfo.destination}
      </Typography>
      <Typography variant="h6">
        <AccessTimeIcon sx={styles.icon} />
        {flightInfo.departureDate} | {flightInfo.departureTime}
      </Typography>
    </Box>
  );
};

export default FlightDetails;
