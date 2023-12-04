import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import usersRouter from "../routes/users.js";
import aircraftsRouter from "../routes/aircraft.js";
import flightsRouter from "../routes/flights.js";
import crewRouter from "../routes/crew.js";
import passengerRouter from "../routes/passenger.js";
import checkoutRouter from "../routes/checkout.js";
import seatmapRouter from "../routes/seatmap.js";
import cancelRouter from "../routes/cancel.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

// Use routes
app.use("/api", usersRouter);
app.use("/api", aircraftsRouter);
app.use("/api", flightsRouter);
app.use("/api", crewRouter);
app.use("/api", passengerRouter);
app.use("/api", seatmapRouter);
app.use("/api", checkoutRouter);
app.use("/api", cancelRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
