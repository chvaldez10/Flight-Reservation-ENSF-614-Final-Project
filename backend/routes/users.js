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

// Endpoint for login
router.get("/login", async (req, res) => {
  // Extract username and password from query parameters
  const { username, password } = req.query;

  try {
    // Query the database for a user with the provided username
    const user = await db.query("SELECT * FROM Users WHERE UserID = ?", [
      username,
    ]);

    if (user.length === 0) {
      // If user is not found, send a 404 response
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the stored password
    // Note: If storing hashed passwords, use bcrypt.compare here
    if (password === user[0].Password) {
      // If password matches, send a success response
      res.json({ message: "Login successful" });
    } else {
      // If password does not match, send a 401 response
      res.status(401).json({ message: "Incorrect password" });
    }
  } catch (error) {
    // Handle any errors and send a 500 response
    console.error(error);
    res.status(500).json({ message: "Server error" });
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
