import React from "react";
import { Typography, Container, Box } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

function ErrorComponent() {
  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
      <ErrorOutlineIcon sx={{ fontSize: 60, color: "error.main" }} />
      <Typography variant="h4" component="h1" sx={{ mt: 2 }}>
        We are working really hard!
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1">Apologies for the 404</Typography>
      </Box>
    </Container>
  );
}

export default ErrorComponent;
