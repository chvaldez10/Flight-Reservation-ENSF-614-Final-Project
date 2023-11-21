import React from "react";
import Link from "@mui/material/Link";
import { Box, Typography, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px",
        backgroundColor: "#0f0f0f",
        color: "white",
        bottom: 0,
        left: 0,
        width: "100%",
        marginTop: "16px",
      }}
    >
      <Typography variant="body2" component="p">
        Last Updated November © 2023
      </Typography>
      <Box>
        <Link
          href="https://github.com/chvaldez10/Flight-Reservation-ENSF-614-Final-Project"
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
        >
          <IconButton aria-label="GitHub" color="inherit">
            <GitHubIcon />
          </IconButton>
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
