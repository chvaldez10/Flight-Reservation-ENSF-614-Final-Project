import React, { useState } from "react";
import { Box, Button, ThemeProvider } from "@mui/material";
import { theme } from "./../../components/checkout/theme";
import { boxStyles } from "./../../assets/styles/CheckoutStyles";

import CreditCard from "../../components/checkout/CreditCard";
import PassengerDetails from "../../components/checkout/PassengerDetails";
import FlightDetails from "../../components/checkout/FlightDetails";
import InsuranceOption from "../../components/checkout/InsuranceOption";

const Checkout = () => {
  const [hasInsurance, setHasInsurance] = useState(false);

  const handleInsuranceSelect = (isSelected) => {
    setHasInsurance(isSelected);
  };

  return (
    <div>
      <FlightDetails
        flightInfo={{
          origin: "Calgary",
          destination: "Edmonton",
          departureDate: "2023-11-26",
          departureTime: "8:20-9:21",
        }}
      />

      <InsuranceOption onInsuranceSelect={handleInsuranceSelect} />
      <PassengerDetails />
      <CreditCard />
      <ThemeProvider theme={theme}>
        <Box sx={boxStyles}>
          <Button variant="contained" color="primary" fullWidth>
            Complete Payment
          </Button>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default Checkout;
