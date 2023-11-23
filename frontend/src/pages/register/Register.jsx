import React from "react";
import {
  Box,
  TextField,
  Button,
  Link,
  Typography,
  Container,
} from "@mui/material";

const Register = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%", // Takes the full width of the container
          maxWidth: 400, // Maximum width of the box
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 3,
          borderRadius: 1,
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
        <TextField
          label="Address"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{
            bgcolor: "black",
            color: "white",
            "&:hover": { bgcolor: "black", opacity: 0.8 },
          }}
        >
          Register
        </Button>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Link href="/login" underline="hover">
            Sign in
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;
