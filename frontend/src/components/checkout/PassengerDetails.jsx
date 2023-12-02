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
          name="firstName"
          value={passengerInfo.firstName}
          onChange={onPassengerInfoChange}
        />
        <CustomTextField
          label="Last Name"
          name="lastName"
          value={passengerInfo.lastName}
          onChange={onPassengerInfoChange}
        />
        <CustomTextField
          label="Email"
          name="email"
          value={passengerInfo.email}
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
