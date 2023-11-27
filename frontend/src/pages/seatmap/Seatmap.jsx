import React from "react";
import { Box, Typography, Grid, useTheme, useMediaQuery } from "@mui/material";
import SeatRow from "../../components/seatmap/SeatRow";

const Seatmap = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const columns = ["A", "B", "C", "D"];
  const numRows = 20;

  const handleSeatSelect = (seat) => {
    console.log(`Selected seat: ${seat}`);
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        width: "100%",
        overflowX: "auto",
        margin: "0 auto",
        padding: "1rem",
      }}
    >
      <Typography variant="h4" gutterBottom component="div">
        Seatmap
      </Typography>
      <Grid container direction={isSmallScreen ? "column" : "row"} spacing={2}>
        {Array.from({ length: numRows }, (_, index) => (
          <SeatRow
            key={index}
            rowNum={index + 1}
            columns={columns}
            onSelect={handleSeatSelect}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default Seatmap;
