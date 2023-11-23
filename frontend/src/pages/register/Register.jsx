import React from "react";
import {
  Box,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Link,
} from "@mui/material";

const Register = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        bgcolor: "background.paper",
        p: 4,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        Sign up
      </Typography>
      <TextField
        label="First Name"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Last Name"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField label="Email" variant="outlined" fullWidth sx={{ mb: 2 }} />
      <TextField label="Phone" variant="outlined" fullWidth sx={{ mb: 2 }} />
      <TextField label="Address" variant="outlined" fullWidth sx={{ mb: 2 }} />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        sx={{
          bgcolor: "black",
          color: "white",
          mb: 1,
          "&:hover": { bgcolor: "black", opacity: 0.8 },
        }}
        fullWidth
      >
        Register
      </Button>
      <Typography variant="body2">
        Already have an account?
        <Link href="/login" underline="hover">
          Sign in
        </Link>
      </Typography>
    </Box>
  );
};

export default Register;
