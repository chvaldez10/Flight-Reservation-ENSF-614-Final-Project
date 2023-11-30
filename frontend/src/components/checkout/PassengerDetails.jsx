import React from "react";
import { Box, Typography, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import CustomTextField from "./CustomTextField";

const PassengerDetails = ({ passengerInfo, onPassengerInfoChange }) => {
  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    console.log(`Updated ${name}: ${value}`);

    // Create a new object with the updated field
    const updatedInfo = {
      ...passengerInfo,
      [name]: value,
    };

    // Call the method passed as a prop with the updated object
    onPassengerInfoChange(updatedInfo);
  };

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
          onChange={handleFieldChange}
        />
        <CustomTextField
          label="Last Name"
          name="lastName"
          value={passengerInfo.lastName}
          onChange={handleFieldChange}
        />
        <CustomTextField
          label="Email"
          name="email"
          value={passengerInfo.email}
          onChange={handleFieldChange}
        />
        <CustomTextField
          label="Phone Number"
          name="phoneNumber"
          value={passengerInfo.phoneNumber}
          onChange={handleFieldChange}
        />
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
