import React from "react";
import { Box, Typography, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import CustomTextField from "./CustomTextField";

const PassengerDetails = ({ passengerInfo, onPassengerInfoChange }) => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={boxStyles}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Passenger Information
        </Typography>

        <CustomTextField
          label="First Name"
          name="FName"
          value={passengerInfo.FName}
          onChange={onPassengerInfoChange}
        />
        <CustomTextField
          label="Last Name"
          name="LName"
          value={passengerInfo.LName}
          onChange={onPassengerInfoChange}
        />
        <CustomTextField
          label="Email"
          name="Email"
          value={passengerInfo.Email}
          onChange={onPassengerInfoChange}
        />
      </Box>
    </ThemeProvider>
  );
};

const boxStyles = {
  maxWidth: "500px",
  m: "16px auto",
};

export default PassengerDetails;
