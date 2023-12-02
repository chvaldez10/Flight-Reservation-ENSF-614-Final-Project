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
  const { username, password, role } = req.query;

  try {
    let user;

    switch (role) {
      case "admin":
        user = await db.query("SELECT * FROM AdminUser WHERE AdminID = ?", [
          username,
        ]);
        break;
      case "agent":
        user = await db.query("SELECT * FROM AirlineUser WHERE StaffID = ?", [
          username,
        ]);
        break;
      case "user":
        user = await db.query("SELECT * FROM Users WHERE UserID = ?", [
          username,
        ]);
        break;
      default:
        return res.status(400).json({ message: "Invalid role specified" });
    }

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Password comparison logic remains the same
    if (password === user[0].Password) {
      res.json({ message: "Login successful", role: role });
    } else {
      res.status(401).json({ message: "Incorrect password" });
    }
  } catch (error) {
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

// Endpoint to get MembershipFlag by UserID
router.get("/membership/:userID", async (req, res) => {
  const userID = req.params.userID;

  try {
    const user = await db.query("SELECT MembershipFlag FROM Users WHERE UserID = ?", [userID]);

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const membershipFlag = user[0].MembershipFlag;
    res.json({ userID, membershipFlag });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Endpoint to update MembershipFlag by UserID
router.put("/membership/:userID", async (req, res) => {
  const userID = req.params.userID;

  try {
    // Check if the user exists
    const user = await db.query("SELECT * FROM Users WHERE UserID = ?", [userID]);

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const currentMembershipFlag = user[0].MembershipFlag;

    // Check if MembershipFlag is already 1
    if (currentMembershipFlag === 1) {
      return res.status(400).json({ message: "MembershipFlag is already set to 1" });
    }

    // Update MembershipFlag to 1
    await db.query("UPDATE Users SET MembershipFlag = 1 WHERE UserID = ?", [userID]);

    res.json({ message: "MembershipFlag updated successfully", userID });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// // Endpoint to update MembershipFlag by UserID
// router.put("/membership/:userID", async (req, res) => {
//   const userID = req.params.userID;

//   try {
//     // Check if the user exists
//     const user = await db.query("SELECT * FROM Users WHERE UserID = ?", [userID]);

//     if (user.length === 0) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const currentMembershipFlag = user[0].MembershipFlag;

//     // Toggle MembershipFlag (from 0 to 1 or vice versa)
//     const newMembershipFlag = currentMembershipFlag === 1 ? 0 : 1;

//     // Update MembershipFlag
//     await db.query("UPDATE Users SET MembershipFlag = ? WHERE UserID = ?", [newMembershipFlag, userID]);

//     res.json({ message: "MembershipFlag updated successfully", userID });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

export default router;
