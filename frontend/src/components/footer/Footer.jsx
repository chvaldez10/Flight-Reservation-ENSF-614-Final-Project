import React from "react";
import Link from "@mui/material/Link";
import { Box, Typography, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "5px",
        backgroundColor: "#0f0f0f",
        color: "white",
        width: "100%",
        marginTop: "20px",
      }}
    >
      <Typography variant="body2" component="p" sx={{ textAlign: "left" }}>
        Last Updated December © 2023
      </Typography>
      <Box sx={{ textAlign: "right" }}>
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
