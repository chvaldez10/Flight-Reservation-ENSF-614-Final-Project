import React from "react";
import "./list.css"; // Make sure this file exists and is correctly linked
import { Card, CardContent, Typography, Grid } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

// Sample data for testing
const flightData = [
  {
    origin: "Calgary",
    destination: "Edmonton",
    departureDate: "2023-11-26",
    departureTime: "08:20",
    arrivalTime: "09:21",
    economyPrice: 69,
    comfortPrice: 169,
    businessPrice: "-",
  },
  {
    origin: "Calgary",
    destination: "Edmonton",
    departureDate: "2023-11-26",
    departureTime: "08:50",
    arrivalTime: "09:51",
    economyPrice: 69,
    comfortPrice: 169,
    businessPrice: "-",
  },
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
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={2} className="flight-info">
                <FlightTakeoffIcon className="icon" />
                <Typography>
                  {flight.origin} - {flight.destination}
                </Typography>
              </Grid>
              <Grid item xs={2} className="flight-info">
                <DateRangeIcon className="icon" />
                <Typography>{flight.departureDate}</Typography>
              </Grid>
              <Grid item xs={2} className="flight-info">
                <AccessTimeIcon className="icon" />
                <Typography>
                  {flight.departureTime} - {flight.arrivalTime}
                </Typography>
              </Grid>
              <Grid item xs={2} className="price-info">
                <EventSeatIcon className="icon" />
                <Typography>Economy ${flight.economyPrice}</Typography>
              </Grid>
              <Grid item xs={2} className="price-info">
                <EventSeatIcon className="icon" />
                <Typography>Comfort ${flight.comfortPrice}</Typography>
              </Grid>
              <Grid item xs={2} className="price-info">
                <AttachMoneyIcon className="icon" />
                <Typography>Business {flight.businessPrice}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default List;
