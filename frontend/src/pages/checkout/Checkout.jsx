import React, { useState } from "react";
import { Box, Button, ThemeProvider } from "@mui/material";
import PropTypes from "prop-types";
import { theme } from "./../../components/checkout/theme";
import { boxStyles } from "./../../assets/styles/CheckoutStyles";
import CreditCard from "../../components/checkout/CreditCard";
import PassengerDetails from "../../components/checkout/PassengerDetails";
import FlightDetails from "../../components/checkout/FlightDetails";
import InsuranceOption from "../../components/checkout/InsuranceOption";
import usePassengerInfo from "./../../hooks/usePassengerInfo";
import useCreditCardInfo from "./../../hooks/useCreditCardInfo";

const FLIGHT_INFO = {
  origin: "Calgary",
  destination: "Edmonton",
  departureDate: "2023-11-26",
  departureTime: "8:20-9:21",
};

const Checkout = () => {
  const [hasInsurance, setHasInsurance] = useState(false);
  const { passengerInfo, handlePassengerInfoChange } = usePassengerInfo();
  const { creditCardInfo, handleCreditCardInfoChange } = useCreditCardInfo();

  const handleInsuranceSelect = (isSelected) => setHasInsurance(isSelected);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={boxStyles}>
        <FlightDetails flightInfo={FLIGHT_INFO} />
        <InsuranceOption onInsuranceSelect={handleInsuranceSelect} />
        <PassengerDetails
          passengerInfo={passengerInfo}
          onPassengerInfoChange={handlePassengerInfoChange}
        />
        <CreditCard
          creditCardInfo={creditCardInfo}
          onCreditCardInfoChange={handleCreditCardInfoChange}
        />
        <Button variant="contained" color="primary" fullWidth>
          Complete Payment
        </Button>
      </Box>
    </ThemeProvider>
  );
};

Checkout.propTypes = {
  flightInfo: PropTypes.object.isRequired,
  passengerInfo: PropTypes.object.isRequired,
  creditCardInfo: PropTypes.object.isRequired,
};

export default Checkout;
