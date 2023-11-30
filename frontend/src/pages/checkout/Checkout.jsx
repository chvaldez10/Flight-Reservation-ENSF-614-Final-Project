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

  // State for Passenger Details
  const [passengerInfo, setPassengerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  // State for Credit Card Details
  const [creditCardInfo, setCreditCardInfo] = useState({
    nameOnCard: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const handleInsuranceSelect = (isSelected) => {
    setHasInsurance(isSelected);
  };

  // Handlers for Passenger Info changes
  const handlePassengerInfoChange = (updatedInfo) => {
    setPassengerInfo(updatedInfo);
    console.log("Updated passengerInfo:", updatedInfo);
  };

  // Handlers for Credit Card Info changes
  const handleCreditCardInfoChange = (e) => {
    const { name, value } = e.target;
    setCreditCardInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Simply print checkout information
  const handlePrintStates = () => {
    console.log("Insurance:", hasInsurance);
    console.log("Passenger Info:", passengerInfo);
    console.log("Credit Card Info:", creditCardInfo);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={boxStyles}>
        <FlightDetails
          flightInfo={{
            origin: "Calgary",
            destination: "Edmonton",
            departureDate: "2023-11-26",
            departureTime: "8:20-9:21",
          }}
        />
        <InsuranceOption onInsuranceSelect={handleInsuranceSelect} />

        <PassengerDetails
          passengerInfo={passengerInfo}
          onPassengerInfoChange={handlePassengerInfoChange}
        />

        <CreditCard
          creditCardInfo={creditCardInfo}
          onCreditCardInfoChange={handleCreditCardInfoChange}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handlePrintStates}
        >
          Complete Payment
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default Checkout;
