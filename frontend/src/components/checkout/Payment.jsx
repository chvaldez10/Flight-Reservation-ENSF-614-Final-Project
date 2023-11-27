import React from "react";
import {
  Box,
  TextField,
  Button,
  createTheme,
  ThemeProvider,
  Typography,
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
  },
});

const Payment = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          maxWidth: "500px",
          m: "32px auto",
          color: theme.palette.text.primary,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Pay Invoice
        </Typography>
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
          inputProps={{ maxLength: 16 }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <TextField
            sx={{ mb: 2, mr: 1, flex: "1" }}
            label="Expiration (MM/YY)"
            variant="outlined"
            inputProps={{ maxLength: 5, placeholder: "MM/YY" }}
          />
          <TextField
            sx={{ mb: 2, ml: 1, flex: "1" }}
            label="CVV"
            variant="outlined"
            inputProps={{ maxLength: 3 }}
          />
        </Box>

        <Button variant="contained" color="primary" fullWidth>
          Pay Up
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default Payment;
