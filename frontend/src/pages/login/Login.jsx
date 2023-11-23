import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

const Login = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // full viewport height
        width: "100vw", // full viewport width
        backgroundColor: "background.default",
      }}
    >
      <Paper
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "300px",
          width: "100%", // Responsive width
        }}
      >
        <TextField
          sx={{ mb: 2 }}
          label="Username"
          variant="outlined"
          fullWidth
        />
        <TextField
          sx={{ mb: 2 }}
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
        />
        <Button
          sx={{
            mb: 1,
            bgcolor: "black",
            color: "white",
            "&:hover": {
              bgcolor: "black",
              opacity: 0.8,
            },
          }}
          variant="contained"
          fullWidth
        >
          Login
        </Button>
        <Button
          sx={{
            bgcolor: "white",
            color: "black",
            "&:hover": {
              bgcolor: "white",
              opacity: 0.8,
            },
          }}
          variant="contained"
          fullWidth
        >
          Register
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
