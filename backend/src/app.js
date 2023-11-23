import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import db from "../config/db.js";
import usersRouter from "../routes/users.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

// Use the /users base path for the usersRouter
app.use("/", usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
