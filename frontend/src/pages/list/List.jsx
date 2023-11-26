import React from "react";
import "./list.css";
import { Card, CardContent, Typography, Grid } from "@mui/material";

// Sample data for testing
const flightData = [
  {
    origin: "Calgary",
    destination: "Edmonton",
    departureDate: "2023-11-26",
    departureTime: "08:20",
    arrivalTime: "09:21",
    economyPrice: 192,
    businessPrice: "-", // Assuming "-" means not available
  },
  // ... other flight objects
];

const List = () => {
  return (
    <div className="flight-container">
      <div className="flight-header">
        Flight Results: {flightData.length} flights found
      </div>
      {flightData.map((flight, index) => (
        <Card key={index} className="flight-item">
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3} className="flight-info">
                <Typography>{flight.departureTime}</Typography>
                <Typography>Non-stop - 1hr01m</Typography>
                <Typography>
                  {flight.origin} - {flight.destination}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3} className="flight-info">
                <Typography>Departure: {flight.departureDate}</Typography>
                <Typography>Arrival Time: {flight.arrivalTime}</Typography>
              </Grid>
              <Grid item xs={6} sm={3} className="price-info">
                <Typography>Economy</Typography>
                <Typography>${flight.economyPrice}</Typography>
              </Grid>
              <Grid item xs={6} sm={3} className="price-info">
                <Typography>Business Class</Typography>
                <Typography>{flight.businessPrice}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default List;
