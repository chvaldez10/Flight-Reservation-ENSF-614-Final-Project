import React from "react";
import { Box, Typography, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import CustomTextField from "./CustomTextField";

const PassengerDetails = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={boxStyles}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Passenger Information
        </Typography>

        <CustomTextField label="First Name" />
        <CustomTextField label="Last Name" />
        <CustomTextField label="Email" />
        <CustomTextField label="Phone Number" />
      </Box>
    </ThemeProvider>
  );
};

// Styles moved outside of the component
const boxStyles = {
  maxWidth: "500px",
  m: "16px auto",
};

export default PassengerDetails;
