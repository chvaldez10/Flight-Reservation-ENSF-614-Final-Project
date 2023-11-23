import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import usersRouter from "../routes/users.js";
import aircraftsRouter from "../routes/aircrafts.js";
import flightsRouter from "../routes/flights.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

// Use routes
app.use("/", usersRouter);
app.use("/api", aircraftsRouter);
app.use("/api", flightsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
