import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import db from "../config/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get("/api/users", async (req, res) => {
  try {
    // Use the Singleton instance for database queries
    const users = await db.query("select * from users");
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
