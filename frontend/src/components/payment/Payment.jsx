import React from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Button,
  createTheme,
  ThemeProvider,
} from "@mui/material";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#000", // Black color
    },
    background: {
      default: "#fff", // White color
    },
    text: {
      primary: "#000", // Black color
      secondary: "#fff", // White color
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#fff", // White text for buttons
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label.Mui-focused": {
            color: "#000", // Black color for the label text when focused
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#000", // Black color for the border when focused
            },
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: "#000", // Black color for radio buttons
          "&.Mui-checked": {
            color: "#000", // Black color for checked state
          },
        },
      },
    },
  },
});

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = React.useState("creditCard");

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{ maxWidth: "500px", m: "auto", color: theme.palette.text.primary }}
      >
        <FormControl component="fieldset" sx={{ mb: 2 }}>
          <FormLabel component="legend">Payment</FormLabel>
          <RadioGroup
            aria-label="payment method"
            name="paymentMethod"
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
          >
            <FormControlLabel
              value="creditCard"
              control={<Radio />}
              label="Credit card"
            />
            <FormControlLabel
              value="debitCard"
              control={<Radio />}
              label="Debit card"
            />
            <FormControlLabel
              value="paypal"
              control={<Radio />}
              label="PayPal"
            />
          </RadioGroup>
        </FormControl>

        {paymentMethod === "creditCard" && (
          <Box>
            <TextField
              fullWidth
              sx={{ mb: 2 }}
              label="Name on card"
              variant="outlined"
            />
            <TextField
              fullWidth
              sx={{ mb: 2 }}
              label="Credit card number"
              variant="outlined"
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                sx={{ mb: 2, mr: 1, flex: "1" }}
                label="Expiration"
                variant="outlined"
              />
              <TextField
                sx={{ mb: 2, ml: 1, flex: "1" }}
                label="CVV"
                variant="outlined"
              />
            </Box>
          </Box>
        )}

        <Button variant="contained" color="primary" fullWidth>
          Continue to checkout
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default Payment;
