import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Link as RouterLink } from "react-router-dom"; // Alias to avoid naming conflict

const Login = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
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
          width: "100%",
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
        {/* Button as a link to the Register component */}
        <Button
          component={RouterLink} // Use RouterLink as the component for the Button
          to="/register" // Set the destination route
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
