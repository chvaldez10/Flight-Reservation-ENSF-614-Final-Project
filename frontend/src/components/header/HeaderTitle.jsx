import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const HeaderTitle = ({ title, subtitle }) => {
  return (
    <Box
      sx={{ textAlign: "left", padding: "25px", backgroundColor: "#0f0f0f" }}
    >
      <Typography variant="h5" component="div" sx={{ color: "#ffffff" }}>
        {title}
      </Typography>
      <Typography variant="subtitle1" component="div" sx={{ color: "#cccccc" }}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default HeaderTitle;
