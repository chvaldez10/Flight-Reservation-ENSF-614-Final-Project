import express from "express";
import bcrypt from "bcrypt";
import { check, validationResult } from "express-validator";
import db from "../config/db.js";

const router = express.Router();

// Endpoint for fetching all users
router.get("/users", async (req, res) => {
  try {
    // Use the Singleton instance for database queries
    const users = await db.query("select * from registered_users");
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint for user registration
router.post(
  "/register",
  [
    // Express-validator middleware for input validation
    check("email").isEmail(),
    check("first_name").notEmpty(),
    check("last_name").notEmpty(),
    check("phone").optional(),
    check("address").optional().isLength({ max: 255 }),
    check("password").isLength({ min: 6 }), // Example: Minimum 6 characters for the password
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructure the request body
    const { email, first_name, last_name, phone, address, password } = req.body;

    try {
      // Check if the user already exists
      const existingUser = await db.query(
        "SELECT * FROM registered_users WHERE email = ?",
        [email]
      );
      if (existingUser.length > 0) {
        return res.status(400).json({ msg: "User already exists" });
      }

      // Hash the password before storing it in the database
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds

      // Insert the new user into the database
      await db.query(
        "INSERT INTO registered_users (email, first_name, last_name, phone, address, password) VALUES (?, ?, ?, ?, ?, ?)",
        [email, first_name, last_name, phone, address, hashedPassword]
      );

      return res.status(201).json({ msg: "User registered successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Server error" });
    }
  }
);

export default router;
