import express from "express";
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
    check("UserID").notEmpty(),
    check("email").isEmail(),
    check("FName").notEmpty(),
    check("LName").notEmpty(),
    check("Phone").optional(),
    check("Address").optional().isLength({ max: 225 }),
    check("Password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { UserID, email, FName, LName, Phone, Address, Password } = req.body;

    try {
      const existingUser = await db.query(
        "SELECT * FROM Users WHERE Email = ? OR UserID = ?",
        [email, UserID]
      );
      if (existingUser.length > 0) {
        return res.status(400).json({ msg: "User already exists" });
      }

      await db.query(
        "INSERT INTO Users (UserID, FName, LName, Address, Phone, Email, Password, MembershipFlag, LoyaltyBonus) VALUES (?, ?, ?, ?, ?, ?, ?, FALSE, 0)",
        [UserID, FName, LName, Address, Phone, email, Password]
      );

      return res.status(201).json({ msg: "User registered successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Server error" });
    }
  }
);

export default router;
