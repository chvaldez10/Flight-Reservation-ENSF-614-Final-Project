import React from "react";
import { Box, Typography, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import CustomTextField from "./CustomTextField";

const CreditCard = ({ creditCardInfo, onCreditCardInfoChange }) => {
  // Handler to print the updated values to the console
  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    console.log(`Updated ${name}: ${value}`);
    onCreditCardInfoChange(event); // call the passed in change handler
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={boxStyles}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Credit Card
        </Typography>

        <CustomTextField
          label="Name on card"
          name="nameOnCard"
          value={creditCardInfo.nameOnCard}
          onChange={handleFieldChange}
        />
        <CustomTextField
          label="Credit card number"
          name="cardNumber"
          maxLength={16}
          value={creditCardInfo.cardNumber}
          onChange={handleFieldChange}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <CustomTextField
            label="Expiration (MM/YY)"
            name="expirationDate"
            maxLength={5}
            placeholder="MM/YY"
            value={creditCardInfo.expirationDate}
            onChange={handleFieldChange}
            sx={{ mr: 1, flex: "1" }}
          />
          <CustomTextField
            label="CVV"
            name="cvv"
            maxLength={3}
            value={creditCardInfo.cvv}
            onChange={handleFieldChange}
            sx={{ ml: 1, flex: "1" }}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

const boxStyles = {
  maxWidth: "500px",
  m: "16px auto",
};

export default CreditCard;
