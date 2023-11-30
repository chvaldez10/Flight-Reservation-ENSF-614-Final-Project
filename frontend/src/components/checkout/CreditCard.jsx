import React from "react";
import { Box, Button, Typography, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import CustomTextField from "./CustomTextField";

const CreditCard = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={boxStyles}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Credit Card
        </Typography>

        <CustomTextField label="Name on card" />
        <CustomTextField label="Credit card number" maxLength={16} />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <CustomTextField
            label="Expiration (MM/YY)"
            maxLength={5}
            placeholder="MM/YY"
            sx={{ mr: 1, flex: "1" }}
          />
          <CustomTextField
            label="CVV"
            maxLength={3}
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
