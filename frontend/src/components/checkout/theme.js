import { createTheme } from "@mui/material";

export const theme = createTheme({
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
